"use client";

import { signOut, useSession } from "next-auth/react";


export const Navbar = () => {
    const {data: session} = useSession();
    return (
        <div className="h-20 w-full flex items-center justify-between p-4 bg-white shadow sticky top-0">
            <h1 className="text-3xl font-bold text-gray-900">
                Sistema de hospedaria
            </h1>
            <div className="flex items-center gap-2">
                 <p>{session?.user?.name}</p>
                <button onClick={() => signOut()}>Sair</button>
            </div>
        </div>
    );
};