import { RefreshTokenDto, TokenDto } from "../dtos/token.dto";
import { IRefreshToken, IToken } from "../models/token";
import { IMapperFromDto } from "./mapper";

class TokenMapper implements IMapperFromDto<TokenDto, IToken> {
  fromDto(data: TokenDto): IToken {
    return {
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
    };
  }

  fromRefreshTokenDto(data: RefreshTokenDto): IRefreshToken {
    return {
      refreshToken: data.refreshToken,
    };
  }
}

export const tokenMapper = new TokenMapper();
