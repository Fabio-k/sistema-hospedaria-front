"use client";
import HospedeForm from "@/concepts/hospede";
import { Hospede } from "@/concepts/type";
import { ERROR_MESSAGES, ErrorMessageKey } from "@/lib/utils";
import { useSistemaHospedariaApi } from "@/utils/sistemaHospedariaApi";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function editarHospede() {
  const [hospede, setHospede] = useState<Hospede | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const params = useParams();
  const {data: session, status: loginStatus} = useSession();
  const api = useSistemaHospedariaApi();

  useEffect(() => {
    setLoading(true);
    const id = params.id;
    if(loginStatus === "authenticated" && session?.accessToken) {
      api
        .get(process.env.NEXT_PUBLIC_API_URL + "/hospede/" + id)
        .then(function (response) {
          setHospede(response.data);
          setLoading(false);
        });
    }
  }, [params, session?.accessToken, loginStatus]);

  const handleSubmit = (data: any, form: any) => {
    const {
      id,
      endereco: { hospedeId, ...enderecoSemHospede },
      ...hospedeSemId
    } = data;

    const safeData = {
      ...hospedeSemId,
      endereco: enderecoSemHospede,
    };
    api
      .patch(
        process.env.NEXT_PUBLIC_API_URL + "/hospede/" + params.id,
        safeData
      )
      .then(function (response) {
        router.push("/");
      })
      .catch((error) => {
        const messages = error.response.data.erros;
        if (!messages || !Array.isArray(messages)) {
          console.log(messages);
          return;
        }
        for (const message of messages) {
          const msg =
            ERROR_MESSAGES[message.code as ErrorMessageKey] ??
            ERROR_MESSAGES.generalError;
          form.setError(message.field, {
            message: msg,
          });
        }
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <HospedeForm
      title="Editar hóspede"
      defaultValues={hospede}
      onSubmit={handleSubmit}
    />
  );
}
