import { Response } from "express";

import { ErrorCode, SuccessCode } from "@/configs/app/code.config";
import { UserDB } from "@/core/db-models/user.db";
import { UserQueryDto } from "@/core/dtos/user.dto";
import { userMapper } from "@/core/mapper/user.mapper";
import { Pagination } from "@/core/models/pagination";
import { User } from "@/core/models/user";
import { searchService } from "@/services/search.service";
import { tokenHandlerService } from "@/services/token-handler.service";
import { generateErrorWithCode } from "@/utils/funcs/generate-error";
import { mapAndCreatePaginationFor } from "@/utils/funcs/map-and-create-pagination";
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
    const user = userMapper.fromMUser(fullUser);
    res.status(SuccessCode.OK).send(user);
  }

  export async function getUsers(
    req: AppRequest<unknown, UserQueryDto>,
    res: Response<Pagination<User>>,
  ): Promise<void> {
    const queryParamFromDto = userMapper.fromQueryDto(req.query);
    const pagination = await mapAndCreatePaginationFor(
      () =>
        UserDB.Model.find(
          {
            firstName: searchService.createSearchFor(queryParamFromDto.search),
          },
          { lastName: true },
        ),
      queryParamFromDto,
    );
    res.status(SuccessCode.Accepted).send(pagination);
  }
}
