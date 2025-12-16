"use client";

import { useSession } from "next-auth/react";

export default function AuthorizationGuard({ children, necessaryRoles }: { children: React.ReactNode, necessaryRoles: string[] }) {
    const { data: session } = useSession();
    if (!session?.roles?.some(role => necessaryRoles.includes(role))) {
        return null;
    }
    return children;
}