import { Response } from "express";

import { ErrorCode, SuccessCode } from "@/configs/app/code.config";
import { MUser, UserDB } from "@/core/db-models/user.db";
import { UserQueryDto, UserUpdateDto } from "@/core/dtos/user.dto";
import { userMapper } from "@/core/mapper/user.mapper";
import { Pagination } from "@/core/models/pagination";
import { ParamName } from "@/routes/route-paths";
import { tokenHandlerService } from "@/services/token-handler.service";
import { createPagination } from "@/utils/funcs/create-pagination";
import { generateErrorWithCode, ResponseErrorType } from "@/utils/funcs/generate-error";
import { AppRequest } from "@/utils/types/request";

export namespace UserController {
  export async function getProfile(req: AppRequest, res: Response): Promise<void> {
    const fullUser = await tokenHandlerService.getUserFromHeaderToken(req);
    if (fullUser == null) {
      res.status(ErrorCode.InternalServer).send(
        generateErrorWithCode(ErrorCode.InternalServer, {
          nonFieldErrors: ["Could not find user profile."],
        }),
      );
      return;
    }
    res.status(SuccessCode.OK).send(fullUser);
  }

  export async function getUsers(
    req: AppRequest<unknown, UserQueryDto>,
    res: Response<Pagination<MUser>>,
  ): Promise<void> {
    const queryParamFromDto = userMapper.fromQueryDto(req.query);
    const pagination = await createPagination(
      () => UserDB.Model.find({}, UserDB.FullProjection),
      queryParamFromDto,
    );
    res.status(SuccessCode.Accepted).send(pagination);
  }

  export async function getUserById(
    req: AppRequest<unknown, unknown, ParamName>,
    res: Response<MUser | ResponseErrorType>,
  ): Promise<void> {
    const user = await UserDB.Model.findById(req.params.userId, UserDB.FullProjection);
    if (user == null) {
      res
        .status(ErrorCode.NotFound)
        .send(generateErrorWithCode(ErrorCode.NotFound, { nonFieldErrors: ["Invalid user ID."] }));
      return;
    }
    res.status(SuccessCode.Accepted).send(user);
  }

  export async function updateUser(
    req: AppRequest<UserUpdateDto, unknown, ParamName>,
    res: Response<MUser | ResponseErrorType>,
  ): Promise<void> {
    const userUpdateData = userMapper.fromCreationDto(req.body);
    const updatedUser = await UserDB.Model.findOneAndUpdate(
      { _id: req.params.userId },
      userUpdateData,
      { new: true, projection: UserDB.FullProjection },
    );
    if (updatedUser == null) {
      res
        .status(ErrorCode.NotFound)
        .send(generateErrorWithCode(ErrorCode.NotFound, { nonFieldErrors: ["Invalid user ID."] }));
      return;
    }
    res.status(SuccessCode.Accepted).send(updatedUser);
  }
}
