import { OAuth2Client } from "google-auth-library";

import { GOOGLE_CLIENT_ID } from "@/configs/google/google.config";
import { GoogleLoginData } from "@/core/models/google-login-data";
import { assertNonNull } from "@/utils/funcs/assert-non-null";

const client = new OAuth2Client(GOOGLE_CLIENT_ID);

class GoogleOauthService {
  public async verifyTokenId(loginInfo: GoogleLoginData): Promise<GoogleLoginData | null> {
    try {
      const ticket = await client.verifyIdToken({
        idToken: loginInfo.googleTokenId,
        audience: GOOGLE_CLIENT_ID,
      });
      const payload = ticket.getPayload();
      if (payload == null) {
        return null;
      }
      assertNonNull(payload.email);
      return {
        ...loginInfo,
        email: payload.email,
      };
    } catch (e) {
      console.error(e);
      return null;
    }
  }
}

export const googleOauthService = new GoogleOauthService();
