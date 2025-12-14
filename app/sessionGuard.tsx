"use client";
import { getSession, signIn, useSession } from "next-auth/react";

export default function SessionGuard({ children }: { children: React.ReactNode }){
    const {status, data: session } = useSession();

    console.log(session);
    if (status === "unauthenticated" || session?.error) {
        signIn("keycloak");
        return;
    }
    if (status === "loading") {
        return <div>Carregando...</div>;
    }
  return children;
}