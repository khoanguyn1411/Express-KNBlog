import { Response } from "express";

import { ErrorCode, SuccessCode } from "@/configs/app/code.config";
import { BlogEmoticonDB } from "@/core/db-models/blog-emoticon.db";
import { BlogEmoticonCreationDto } from "@/core/dtos/blog-emoticon.dto";
import { blogEmoticonMapper } from "@/core/mapper/blog-emoticon.mapper";
import { ParamName } from "@/routes/route-paths";
import { tokenHandlerService } from "@/services/token-handler.service";
import { assertNonNull } from "@/utils/funcs/assert-non-null";
import { generateErrorWithCode } from "@/utils/funcs/generate-error";
import { AppRequest } from "@/utils/types/request";

export namespace BlogEmoticonController {
  export async function addEmoticon(req: AppRequest<BlogEmoticonCreationDto>, res: Response) {
    const user = await tokenHandlerService.getUserFromHeaderToken(req);
    assertNonNull(user);
    const blogEmoticonCreationData = blogEmoticonMapper.fromCreationDto(req.body);
    const isEmoticonExist = await BlogEmoticonDB.Model.findOne({
      blog: blogEmoticonCreationData.blogId,
      user: user._id,
    });
    if (isEmoticonExist) {
      res
        .status(ErrorCode.BadData)
        .send(
          generateErrorWithCode({ code: ErrorCode.BadData, message: "Emoticon is already added." }),
        );
      return;
    }
    await BlogEmoticonDB.Model.create({
      blog: blogEmoticonCreationData.blogId,
      user: user._id,
    });
    res.sendStatus(SuccessCode.Created);
  }
  export async function removeEmoticon(
    req: AppRequest<unknown, unknown, ParamName>,
    res: Response,
  ) {
    const user = await tokenHandlerService.getUserFromHeaderToken(req);
    assertNonNull(user);
    const deleteResult = await BlogEmoticonDB.Model.deleteOne({
      blog: req.params.blogId,
      user: user._id,
    });

    if (deleteResult.deletedCount === 0) {
      res
        .status(ErrorCode.BadData)
        .send(generateErrorWithCode({ code: ErrorCode.BadData, message: "Emoticon not found." }));
      return;
    }

    res.sendStatus(SuccessCode.OK);
  }
}
