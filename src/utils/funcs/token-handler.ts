import { Request } from "express";
import jwt from "jsonwebtoken";

import { APP_JWT_ACCESS_TOKEN, APP_JWT_REFRESH_TOKEN } from "@/configs/app/app.config";
import { IToken } from "@/core/models/token";
import { IUser, User, UserMongoose } from "@/core/models/user";

export class TokenHandler {
  public signToken(user: IUser, currentRefreshToken?: string): IToken {
    return {
      accessToken: this.signAccessToken(user),
      refreshToken: currentRefreshToken ?? this.signRefreshToken(user),
    };
  }

  private signAccessToken(user: IUser) {
    return jwt.sign(user, APP_JWT_ACCESS_TOKEN, {
      expiresIn: "3h",
    });
  }

  private signRefreshToken(user: IUser) {
    return jwt.sign({ _id: user._id }, APP_JWT_REFRESH_TOKEN, {
      expiresIn: "1d",
    });
  }

  private getUserIdDecoded(token: string): string | null {
    try {
      const userIdDecoded = jwt.decode(token);
      if (userIdDecoded == null) {
        return null;
      }
      return (userIdDecoded as Pick<UserMongoose, "_id">)._id;
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  public async resignNewTokenOnRefresh(refreshToken: string): Promise<IToken | null> {
    const userId = this.getUserIdDecoded(refreshToken);
    if (userId == null) {
      return null;
    }
    const user = await User.findById(userId);
    return user == null ? null : this.signToken(user.toObject<IUser>(), refreshToken);
  }

  public async decodeAccessTokenFromHeader(req: Request): Promise<IUser | null> {
    const authorization = req.headers.authorization;
    const accessToken = authorization ? authorization.split(" ")[1] : null;
    if (accessToken == null) {
      return null;
    }
    try {
      const userDecoded = jwt.decode(accessToken);
      const userDecodedCasted = userDecoded as IUser;
      if (userDecoded == null || userDecodedCasted._id == null) {
        return null;
      }
      const user = await User.findById(userDecodedCasted._id);
      return user == null ? null : user.toObject<IUser>();
    } catch (e) {
      return null;
    }
  }
}

export const tokenHandler = new TokenHandler();
