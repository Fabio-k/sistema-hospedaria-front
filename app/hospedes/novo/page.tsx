"use client";

import HospedeForm from "@/concepts/hospede";
import { Hospede } from "@/concepts/type";
import { ERROR_MESSAGES, ErrorMessageKey } from "@/lib/utils";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function NovoHospede() {
  const router = useRouter();
  function onSubmit(data: Hospede, form: any) {
    axios
      .post(process.env.NEXT_PUBLIC_API_URL + "/hospede", data)
      .then(function (response) {
        router.push("/");
      })
      .catch((error) => {
        const messages = error.response.data.erros;
        for (const message of messages) {
          const msg =
            ERROR_MESSAGES[message.code as ErrorMessageKey] ??
            ERROR_MESSAGES.generalError;
          form.setError(message.field, {
            message: msg,
          });
        }
      });
  }
  return <HospedeForm title="Novo hóspede" onSubmit={onSubmit} />;
}
