import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";

import { APP_JWT_ACCESS_TOKEN, APP_JWT_REFRESH_TOKEN } from "@/configs/app/app.config";
import { IToken } from "@/core/models/token";
import { IUser, User, UserMongoose } from "@/core/models/user";

// eslint-disable-next-line @typescript-eslint/naming-convention
type User = IUser & { _id: ObjectId };

export class TokenHandler {
  public signToken(user: User, currentRefreshToken?: string): IToken {
    return {
      accessToken: this.signAccessToken(user),
      refreshToken: currentRefreshToken ?? this.signRefreshToken(user),
    };
  }

  private signAccessToken(user: User) {
    return jwt.sign(user, APP_JWT_ACCESS_TOKEN, {
      expiresIn: "3h",
    });
  }

  private signRefreshToken(user: User) {
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
    if (user == null) {
      return null;
    }
    return this.signToken(user, refreshToken);
  }
}

export const tokenHandler = new TokenHandler();
