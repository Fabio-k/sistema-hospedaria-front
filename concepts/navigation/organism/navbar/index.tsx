"use client";

import { signOut, useSession } from "next-auth/react";

export const Navbar = () => {
    const {data: session} = useSession();

    async function handleLogout() {
        await signOut({ redirect: false }).then(() => {
            window.location.href = `http://localhost:8081/realms/sistema-hospedaria/protocol/openid-connect/logout?client_id=sistemahospedaria&post_logout_redirect_uri=${encodeURIComponent("http://localhost:3000/")}`;
        });
    }


    return (
        <div className="h-20 w-full flex items-center justify-between p-4 bg-white shadow sticky top-0">
            <h1 className="text-3xl font-bold text-gray-900">
                Sistema de hospedaria
            </h1>
            <div className="flex items-center gap-2">
                 <p>{session?.user?.name}</p>
                <button onClick={handleLogout}>Sair</button>
            </div>
        </div>
    );
};