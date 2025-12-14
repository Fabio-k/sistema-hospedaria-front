import NextAuth from "next-auth"
import KeycloakProvider from "next-auth/providers/keycloak";
import { decodeJwt } from "jose";
import axios from "axios";

const handleRefreshToken = async (token: any) => {
  try {
    const params = new URLSearchParams();
    params.append("grant_type", "refresh_token");
    params.append("client_id", process.env.KEYCLOAK_ID!);
    params.append("client_secret", process.env.KEYCLOAK_SECRET!);
    params.append("refresh_token", token.refreshToken);
    const res = await axios.post(`${process.env.KEYCLOAK_ISSUER}/protocol/openid-connect/token`, params, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    return res.data;
  } catch (err) {
    console.error("Failed to refresh token", err);
    return null;
  }
}

const handler = NextAuth({
  providers: [
    KeycloakProvider({
    clientId: process.env.KEYCLOAK_ID!,
    clientSecret: process.env.KEYCLOAK_SECRET!,
    issuer: process.env.KEYCLOAK_ISSUER!,
  })
  ],
  callbacks: {
  async jwt({ token, account }) {
    if (account) {
      token.accessToken = account.access_token
      token.accessTokenExpires = account.expires_at! * 1000 - 60 * 1000;
      token.refreshToken = account.refresh_token!

      const decoded: any = decodeJwt(token.accessToken!)
      
      token.roles = decoded.realm_access?.roles || [];

      return token;
    }

    if((token.accessTokenExpires as number) > Date.now()) {
      return token;
    }

    const refreshedToken = await handleRefreshToken(token);
    if(refreshedToken) {
      console.log("Token refreshed", refreshedToken);
      token.accessToken = refreshedToken.access_token;
      token.accessTokenExpires = Date.now() + refreshedToken.expires_in! * 1000 - 60 * 1000;
      token.refreshToken = refreshedToken.refresh_token!;
    }

    if(refreshedToken == null) {
      token.error = "Refresh token failed";
    }

    return token;
  },
  async session({ session, token, user }) {
    session.accessToken = token.accessToken ?? "";
    session.refreshToken = token.refreshToken ?? "";
    session.roles = token.roles;
    session.error = token.error;
    return session
  }
} 
})

export const GET = handler;
export const POST = handler;