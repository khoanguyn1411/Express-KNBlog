import { Response } from "express";

import { ErrorCode, SuccessCode } from "@/configs/app/code.config";
import { GoogleLoginDataDto } from "@/core/dtos/google-login-data.dto";
import { LoginDataDto } from "@/core/dtos/login-data.dto";
import { RegisterDataDto } from "@/core/dtos/register-data.dto";
import { googleLoginDataMapper } from "@/core/mapper/google-login-data.mapper";
import { loginDataMapper } from "@/core/mapper/login-data.mapper";
import { registerDataMapper } from "@/core/mapper/register-data.mapper";
import { userMapper } from "@/core/mapper/user.mapper";
import { IGoogleLoginData } from "@/core/models/google-login-data";
import { ILoginData } from "@/core/models/login-data";
import { OutdateToken } from "@/core/models/outdate-token";
import { IRegisterData } from "@/core/models/register-data";
import { IToken } from "@/core/models/token";
import { User } from "@/core/models/user";
import { googleOauthService } from "@/services/google-oauth.service";
import { passwordService } from "@/services/password.service";
import { tokenHandlerService } from "@/services/token-handler.service";
import { assertNonNull } from "@/utils/funcs/assert-non-null";
import { generateErrorWithCode, ResponseErrorType } from "@/utils/funcs/generate-error";
import { sendUnauthorizedError } from "@/utils/funcs/send-unauthorized-error";
import { AppRequest } from "@/utils/types/request";

export namespace AuthController {
  export async function logout(req: AppRequest<GoogleLoginDataDto>, res: Response): Promise<void> {
    const accessToken = tokenHandlerService.getAccessTokenFromHeader(req);
    const user = await tokenHandlerService.decodeAccessTokenFromHeader(req);
    assertNonNull(user);
    await OutdateToken.Model.create({ accessToken, user: user._id });
    res.sendStatus(SuccessCode.OK);
  }
  export async function loginWithGoogle(
    req: AppRequest<GoogleLoginDataDto>,
    res: Response<IToken | ResponseErrorType<IGoogleLoginData>>,
  ): Promise<void> {
    const googleLoginData = googleLoginDataMapper.fromDto(req.body);
    const verifiedGoogleLoginData = await googleOauthService.verifyTokenId(googleLoginData);
    if (verifiedGoogleLoginData == null) {
      sendUnauthorizedError(res);
      return;
    }
    const newUser = userMapper.fromGoogleData(verifiedGoogleLoginData);
    const currentUser = await User.Model.findOne({ email: newUser.email });
    if (currentUser == null) {
      const userData = new User.Model(newUser);
      const token = tokenHandlerService.signToken({ _id: userData._id });
      await userData.save();
      res.status(SuccessCode.Created).send(token);
      return;
    }
    const token = tokenHandlerService.signToken({ _id: currentUser._id });
    res.status(SuccessCode.OK).send(token);
  }

  export async function login(
    req: AppRequest<LoginDataDto>,
    res: Response<IToken | ResponseErrorType<ILoginData>>,
  ): Promise<void> {
    const loginData = loginDataMapper.fromDto(req.body);
    const currentUser = await User.Model.findOne({ email: loginData.email });
    if (currentUser == null || currentUser.password == null) {
      sendUnauthorizedError(res);
      return;
    }
    const isPasswordCorrect = passwordService.verifyPassword(
      loginData.password,
      currentUser.password,
    );
    if (!isPasswordCorrect) {
      sendUnauthorizedError(res);
      return;
    }
    const token = tokenHandlerService.signToken({ _id: currentUser._id });
    res.status(SuccessCode.OK).send(token);
  }

  export async function register(
    req: AppRequest<RegisterDataDto>,
    res: Response<IToken | ResponseErrorType<IRegisterData>>,
  ): Promise<void> {
    const registerData = registerDataMapper.fromDto(req.body);
    const userCreation = userMapper.fromRegisterData(registerData);
    const isEmailExists = (await User.Model.findOne({ email: userCreation.email })) != null;
    if (isEmailExists) {
      const error = generateErrorWithCode<IRegisterData>(ErrorCode.BadData, {
        data: { email: "Email already exist." },
      });
      res.status(ErrorCode.BadData).send(error);
      return;
    }
    const hashedPassword = await passwordService.hashPassword(registerData.password);
    const userData = new User.Model({
      ...userCreation,
      password: hashedPassword,
    });
    const token = tokenHandlerService.signToken({ _id: userData._id });
    await userData.save();
    res.status(SuccessCode.Created).send(token);
  }
}
