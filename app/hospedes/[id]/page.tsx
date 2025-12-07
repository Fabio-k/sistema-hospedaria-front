"use client";

import { InfoList } from "@/components/ui/infoList";
import ReturnButton from "@/components/ui/returnButton";
import { Hospede } from "@/concepts/type";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSistemaHospedariaApi } from "@/utils/sistemaHospedariaApi";
import { useSession } from "next-auth/react";

export default function Page() {
  const [hospede, setHospede] = useState<Hospede | null>(null);
  const api = useSistemaHospedariaApi();
  const {data: session, status: loginStatus} = useSession();

  const params = useParams();
  useEffect(() => {
    const id = params.id;
    if(loginStatus === "authenticated" && session?.accessToken) {
    api
      .get(process.env.NEXT_PUBLIC_API_URL + "/hospede/" + id)
      .then(function (response) {
        setHospede(response.data);
      });
    }
  }, [params, session?.accessToken, loginStatus]);

  return (
    <div className="flex flex-col items-center justify-center my-8">
      <div className="flex gap-2 items-center mb-4 w-full max-w-6xl ">
        <ReturnButton />
      </div>
      <div className="bg-white rounded shadow  w-full max-w-6xl p-8">
        <div className="flex gap-2 items-center mb-4">
          <h1 className="text-3xl font-bold text-gray-900">
            {hospede?.nomeCompleto}
          </h1>
          <p>{hospede?.email}</p>
        </div>

        <InfoList
          data={{
            telefone: hospede?.telefone,
            cpf: hospede?.cpf,
            "data nascimento": hospede?.dataNascimento,
          }}
        />
      </div>

      <div className="bg-white rounded shadow mt-8 w-full max-w-6xl p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Endereço</h1>
        <InfoList
          data={{
            logradouro: hospede?.endereco?.logradouro,
            bairro: hospede?.endereco?.bairro,
            numero: hospede?.endereco?.numero,
            complemento: hospede?.endereco?.complemento,
            cidade: hospede?.endereco?.cidade,
            estado: hospede?.endereco?.estado,
          }}
        />
      </div>
    </div>
  );
}
