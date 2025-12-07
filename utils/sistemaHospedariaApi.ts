"use client";

import axios from "axios";
import { useSession } from "next-auth/react";
import { useMemo } from "react";

export function useSistemaHospedariaApi() {
  const { data: session } = useSession();

  const api = useMemo(() => {
    return axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL,
      headers: {
        Authorization: session?.accessToken
          ? `Bearer ${session.accessToken}`
          : undefined
      }
    });
  }, [session?.accessToken]);

  return api;
}