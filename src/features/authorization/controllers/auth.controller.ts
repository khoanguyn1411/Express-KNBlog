import { Response } from "express";

import { ErrorCode, SuccessCode } from "@/configs/app/code.config";
import { OutdateTokenDB } from "@/core/db-models/outdate-token.db";
import { UserDB } from "@/core/db-models/user.db";
import { GoogleLoginDataDto } from "@/core/dtos/google-login-data.dto";
import { LoginDataDto } from "@/core/dtos/login-data.dto";
import { RegisterDataDto } from "@/core/dtos/register-data.dto";
import { googleLoginDataMapper } from "@/core/mapper/google-login-data.mapper";
import { loginDataMapper } from "@/core/mapper/login-data.mapper";
import { registerDataMapper } from "@/core/mapper/register-data.mapper";
import { userMapper } from "@/core/mapper/user.mapper";
import { GoogleLoginData } from "@/core/models/google-login-data";
import { LoginData } from "@/core/models/login-data";
import { RegisterData } from "@/core/models/register-data";
import { Token } from "@/core/models/token";
import { googleOauthService } from "@/services/google-oauth.service";
import { passwordService } from "@/services/password.service";
import { tokenHandlerService } from "@/services/token-handler.service";
import { assertNonNull } from "@/utils/funcs/assert-non-null";
import { generateErrorWithCode, ResponseErrorType } from "@/utils/funcs/generate-error";
import { sendUnauthorizedError } from "@/utils/funcs/send-unauthorized-error";
import { AppRequest } from "@/utils/types/request";

function sendUnableLoginError(res: Response) {
  const errorCode = ErrorCode.Unauthorized;
  res.status(errorCode).send(
    generateErrorWithCode<LoginDataDto>(errorCode, {
      nonFieldErrors: "Unable to login with your credential.",
    }),
  );
}

export namespace AuthController {
  export async function logout(req: AppRequest<GoogleLoginDataDto>, res: Response): Promise<void> {
    const accessToken = tokenHandlerService.getAccessTokenFromHeader(req);
    const user = await tokenHandlerService.getUserFromHeaderToken(req);
    assertNonNull(user);
    await OutdateTokenDB.Model.create({ accessToken, user: user._id });
    res.sendStatus(SuccessCode.OK);
  }
  export async function loginWithGoogle(
    req: AppRequest<GoogleLoginDataDto>,
    res: Response<Token | ResponseErrorType<GoogleLoginData>>,
  ): Promise<void> {
    const googleLoginData = googleLoginDataMapper.fromDto(req.body);
    const verifiedGoogleLoginData = await googleOauthService.verifyTokenId(googleLoginData);
    if (verifiedGoogleLoginData == null) {
      sendUnauthorizedError(res);
      return;
    }
    const newUser = userMapper.fromGoogleData(verifiedGoogleLoginData);
    const currentUser = await UserDB.Model.findOne({ email: newUser.email });
    if (currentUser == null) {
      const userData = new UserDB.Model(newUser);
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
    res: Response<Token | ResponseErrorType<LoginData>>,
  ): Promise<void> {
    const loginData = loginDataMapper.fromDto(req.body);
    const currentUser = await UserDB.Model.findOne({ email: loginData.email });

    if (currentUser == null || currentUser.password == null) {
      sendUnableLoginError(res);
      return;
    }
    const isPasswordCorrect = await passwordService.verifyPassword(
      loginData.password,
      currentUser.password,
    );
    if (!isPasswordCorrect) {
      sendUnableLoginError(res);
      return;
    }
    const token = tokenHandlerService.signToken({ _id: currentUser._id });
    res.status(SuccessCode.OK).send(token);
  }

  export async function register(
    req: AppRequest<RegisterDataDto>,
    res: Response<Token | ResponseErrorType<RegisterData>>,
  ): Promise<void> {
    const registerData = registerDataMapper.fromDto(req.body);
    const userCreation = userMapper.fromRegisterData(registerData);
    const isEmailExists = (await UserDB.Model.findOne({ email: userCreation.email })) != null;
    if (isEmailExists) {
      const error = generateErrorWithCode<RegisterData>(ErrorCode.BadData, {
        data: { email: "Email already existed." },
      });
      res.status(ErrorCode.BadData).send(error);
      return;
    }
    const hashedPassword = await passwordService.hashPassword(registerData.password);
    const userData = new UserDB.Model({
      ...userCreation,
      password: hashedPassword,
    });
    const token = tokenHandlerService.signToken({ _id: userData._id });
    await userData.save();
    res.status(SuccessCode.Created).send(token);
  }
}
