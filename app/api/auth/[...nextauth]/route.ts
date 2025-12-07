import NextAuth from "next-auth"
import KeycloakProvider from "next-auth/providers/keycloak";

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
      token.accessTokenExpires = account.expires_at! * 1000
      token.refreshToken = account.refresh_token!
      return token;
    }

    if((token.accessTokenExpires as number) > Date.now()) {
      return token;
    }

    return token;
  },
  async session({ session, token, user }) {
    session.accessToken = token.accessToken ?? "";
    return session
  }
} 
})

export const GET = handler;
export const POST = handler;