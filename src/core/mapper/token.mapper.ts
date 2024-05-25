import { RefreshTokenDto, TokenDto } from "../dtos/token.dto";
import { RefreshToken, Token } from "../models/token";
import { IMapperFromDto } from "./mapper";

class TokenMapper implements IMapperFromDto<TokenDto, Token> {
  fromDto(data: TokenDto): Token {
    return {
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
    };
  }

  fromRefreshTokenDto(data: RefreshTokenDto): RefreshToken {
    return {
      refreshToken: data.refreshToken,
    };
  }
}

export const tokenMapper = new TokenMapper();
