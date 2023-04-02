import jwt from "jsonwebtoken";

import { APP_JWT_ACCESS_TOKEN, APP_JWT_REFRESH_TOKEN } from "@/configs/app/app.config";
import { IToken } from "@/core/models/token";
import { IUser, User } from "@/core/models/user";

export class TokenHandler {
  public signToken(user: IUser, currentRefreshToken?: string): IToken {
    return {
      accessToken: this.signAccessToken(user),
      refreshToken: currentRefreshToken ?? this.signRefreshToken(user),
    };
  }

  private signAccessToken(user: IUser) {
    const userAsObject = user.toObject<IUser>();
    return jwt.sign(userAsObject, APP_JWT_ACCESS_TOKEN, {
      expiresIn: "3h",
    });
  }

  private signRefreshToken(user: IUser) {
    const userAsObject = user.toObject<IUser>();
    return jwt.sign({ _id: userAsObject._id }, APP_JWT_REFRESH_TOKEN, {
      expiresIn: "1d",
    });
  }

  private getUserIdDecoded(token: string): string | null {
    try {
      const userIdDecoded = jwt.decode(token);
      if (userIdDecoded == null) {
        return null;
      }
      return (userIdDecoded as Pick<IUser, "_id">)._id;
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
    if (user == null) {
      return null;
    }
    return this.signToken(user, refreshToken);
  }
}

export const tokenHandler = new TokenHandler();
