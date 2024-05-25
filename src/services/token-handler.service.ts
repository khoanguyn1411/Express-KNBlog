import { Request } from "express";
import jwt from "jsonwebtoken";

import {
  JWT_ACCESS_REFRESH_TIME,
  JWT_ACCESS_TOKEN,
  JWT_ACCESS_TOKEN_TIME,
  JWT_REFRESH_TOKEN,
} from "@/configs/app/app.config";
import { MUser, UserDB } from "@/core/db-models/user.db";
import { Token } from "@/core/models/token";
import { AppRequest } from "@/utils/types/request";

type UserWithOnlyId = Pick<MUser, "_id">;

export class TokenHandlerService {
  /**
   * Signs a new access and refresh token for the given user.
   * @param userId The userId for whom the tokens are being signed.
   * @param currentRefreshToken The current refresh token, if available.
   */
  public signToken(userId: UserWithOnlyId, currentRefreshToken?: string): Token {
    return {
      accessToken: this.signAccessToken(userId),
      refreshToken: currentRefreshToken ?? this.signRefreshToken(userId),
    };
  }

  /**
   * Signs a new access token for the given userId.
   * @param userId The userId for whom the token is being signed.
   */
  private signAccessToken(userId: UserWithOnlyId): string {
    return jwt.sign(userId, JWT_ACCESS_TOKEN, {
      expiresIn: JWT_ACCESS_TOKEN_TIME,
    });
  }

  /**
   * Signs a new refresh token for the given userId.
   * @param userId The userId for whom the token is being signed.
   */
  private signRefreshToken(userId: UserWithOnlyId): string {
    return jwt.sign(userId, JWT_REFRESH_TOKEN, {
      expiresIn: JWT_ACCESS_REFRESH_TIME,
    });
  }

  /**
   * Decodes the user ID from a JWT token.
   * @param token The JWT token to decode.
   */
  private async getUserFromToken(token: string): Promise<MUser | null> {
    try {
      const userIdDecoded = jwt.decode(token) as UserWithOnlyId | null;
      if (userIdDecoded == null) {
        return null;
      }
      return userIdDecoded == null ? null : await UserDB.Model.findById(userIdDecoded._id);
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  /**
   * Resigns a new token pair when a refresh token is used.
   * @param refreshToken The refresh token used to obtain a new token pair.
   */
  public async resignNewTokenOnRefresh(refreshToken: string): Promise<Token | null> {
    const user = await this.getUserFromToken(refreshToken);
    return user == null ? null : this.signToken({ _id: user._id }, refreshToken);
  }

  /**
   * Get access token from header.
   * @param req Request.
   */
  public getAccessTokenFromHeader(req: Request | AppRequest): null | string {
    const authorization = req.headers.authorization;
    const accessToken = authorization ? authorization.split(" ")[1] : null;
    return accessToken;
  }

  /**
   * Decodes and retrieves the user information from the access token in the request header.
   * @param req The Express request object containing the access token.
   */
  public async getUserFromHeaderToken(req: Request | AppRequest): Promise<MUser | null> {
    const accessToken = this.getAccessTokenFromHeader(req);
    return accessToken == null ? null : await this.getUserFromToken(accessToken);
  }
}

export const tokenHandlerService = new TokenHandlerService();
