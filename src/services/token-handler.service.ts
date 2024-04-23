import { Request } from "express";
import jwt from "jsonwebtoken";

import {
  JWT_ACCESS_REFRESH_TIME,
  JWT_ACCESS_TOKEN,
  JWT_ACCESS_TOKEN_TIME,
  JWT_REFRESH_TOKEN,
} from "@/configs/app/app.config";
import { IToken } from "@/core/models/token";
import { IUser, MUser, User } from "@/core/models/user";
import { AppRequest } from "@/utils/types/request";

export class TokenHandlerService {
  /**
   * Signs a new access and refresh token for the given user.
   * @param user The user for whom the tokens are being signed.
   * @param currentRefreshToken The current refresh token, if available.
   */
  public signToken(user: IUser, currentRefreshToken?: string): IToken {
    return {
      accessToken: this.signAccessToken(user),
      refreshToken: currentRefreshToken ?? this.signRefreshToken(user),
    };
  }

  /**
   * Signs a new access token for the given user.
   * @param user The user for whom the token is being signed.
   */
  private signAccessToken(user: IUser): string {
    return jwt.sign(user, JWT_ACCESS_TOKEN, {
      expiresIn: JWT_ACCESS_TOKEN_TIME,
    });
  }

  /**
   * Signs a new refresh token for the given user.
   * @param user The user for whom the token is being signed.
   */
  private signRefreshToken(user: IUser): string {
    return jwt.sign({ _id: user._id }, JWT_REFRESH_TOKEN, {
      expiresIn: JWT_ACCESS_REFRESH_TIME,
    });
  }

  /**
   * Decodes the user ID from a JWT token.
   * @param token The JWT token to decode.
   */
  private getUserIdDecoded(token: string): string | null {
    try {
      const userIdDecoded = jwt.decode(token);
      if (userIdDecoded == null) {
        return null;
      }
      return (userIdDecoded as Pick<MUser, "_id">)._id;
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  /**
   * Resigns a new token pair when a refresh token is used.
   * @param refreshToken The refresh token used to obtain a new token pair.
   */
  public async resignNewTokenOnRefresh(refreshToken: string): Promise<IToken | null> {
    const userId = this.getUserIdDecoded(refreshToken);
    if (userId == null) {
      return null;
    }
    const user = await User.Model.findById(userId);
    return user == null ? null : this.signToken(user.toObject<IUser>(), refreshToken);
  }

  /**
   * Decodes and retrieves the user information from the access token in the request header.
   * @param req The Express request object containing the access token.
   */
  public async decodeAccessTokenFromHeader(req: Request | AppRequest): Promise<IUser | null> {
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
      const user = await User.Model.findById(userDecodedCasted._id);
      return user == null ? null : user.toObject<IUser>();
    } catch (e) {
      return null;
    }
  }
}

export const tokenHandlerService = new TokenHandlerService();
