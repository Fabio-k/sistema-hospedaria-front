"use client";

import HospedeForm from "@/concepts/hospede";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function NovoHospede() {
  const router = useRouter();
  function onSubmit(data: any) {
    axios
      .post(process.env.NEXT_PUBLIC_API_URL + "/hospede", data)
      .then(function (response) {
        router.push("/");
      });
  }
  return <HospedeForm title="Novo hóspede" onSubmit={onSubmit} />;
}
