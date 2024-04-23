import { OAuth2Client } from "google-auth-library";

import { UserCreationDto } from "@/core/dtos/user.dto";

import { StrictOmit } from "../../utils/types/strict-omit";
import { GOOGLE_CLIENT_ID } from "./google-oauth.config";
const client = new OAuth2Client(GOOGLE_CLIENT_ID);

export async function getUserInfoFromOauthTokenId(
  tokenId: string,
  accessToken: string,
): Promise<UserCreationDto | null> {
  try {
    const ticket = await client.verifyIdToken({
      idToken: tokenId,
      audience: GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    if (payload == null) {
      return null;
    }
    const url = `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${accessToken}`;
    const res = await fetch(url);
    const data: StrictOmit<UserCreationDto, "google_id"> = await res.json();
    if (data.sub == null) {
      return null;
    }
    return {
      ...data,
      google_id: payload.sub,
    };
  } catch (e) {
    console.error(e);
    return null;
  }
}
