"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import axios from "axios";

export default function Home() {
  const [hospedes, setHospedes] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function getHospedes(): Promise<void> {
    try {
      setLoading(true);
      const base = process.env.NEXT_PUBLIC_API_URL ?? "";
      const res = await fetch(`${base.replace(/\/+$/, "")}/hospedes`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setHospedes(data);
    } catch (err: any) {
      console.error("Failed to load hospedes", err);
      setError(err?.message ?? "Erro ao carregar hóspedes");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getHospedes();
  }, []);

  async function toggleStatus(id: string | number, hospedeStatus: string) {
    const action = hospedeStatus === "ATIVO" ? "inativar" : "ativar";
    const targetStatus = hospedeStatus === "ATIVO" ? "INATIVO" : "ATIVO";

    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/hospede/${id}/${action}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
        }
      );
      setHospedes(
        (prev) =>
          prev?.map((h) =>
            h.id === id ? { ...h, status: targetStatus } : h
          ) ?? null
      );
    } catch (err) {
      console.error("Failed to toggle status", err);
    }
  }

  async function deleteHospede(id: string | number) {
    try {
      const res = await axios
        .delete(`${process.env.NEXT_PUBLIC_API_URL}/hospede/${id}`)
        .then((res) => {
          setHospedes((prev) => prev?.filter((h) => h.id !== id) ?? null);
        });
    } catch (err) {
      console.error("Failed to delete hospede", err);
      alert("Erro ao deletar hóspede");
    }
  }

  function editHospede(id: string | number) {
    router.push(`/hospedes/${id}/editar`);
  }

  return (
    <div className="flex flex-col items-center">
      <div className="bg-white rounded shadow mt-8 w-full max-w-6xl">
        <div className="p-4 border-b justify-between items-center flex">
          <h1 className="text-xl font-semibold">Hóspedes</h1>
          <button
            className="bg-primary text-white rounded px-4 py-2 cursor-pointer"
            onClick={() => router.push("/hospedes/novo")}
          >
            Novo hóspede
          </button>
        </div>

        <div className="p-4">
          {loading && <p>Carregando...</p>}
          {error && <p className="text-red-600">Erro: {error}</p>}

          {!loading && hospedes && hospedes.length === 0 && (
            <p>Nenhum hóspede encontrado.</p>
          )}

          {hospedes && hospedes.length > 0 && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-2/5 text-left">Nome</TableHead>
                  <TableHead className="w-1/6 text-left">CPF</TableHead>
                  <TableHead className="w-1/6 text-left">Telefone</TableHead>
                  <TableHead className="w-1/5 text-left">E-mail</TableHead>
                  <TableHead className="w-24 text-center">Status</TableHead>
                  <TableHead className="w-36 text-center">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {hospedes.map((hospede) => (
                  <TableRow
                    key={hospede.id}
                    className="cursor-pointer"
                    onClick={() => router.push(`/hospedes/${hospede.id}`)}
                  >
                    <TableCell className="font-medium">
                      {hospede.nomeCompleto}
                    </TableCell>
                    <TableCell>{hospede.cpf}</TableCell>
                    <TableCell>{hospede.telefone}</TableCell>
                    <TableCell className="text-left truncate max-w-sm">
                      {hospede.email}
                    </TableCell>
                    <TableCell className="text-center">
                      <Switch
                        checked={hospede.status === "ATIVO"}
                        onClick={(e) => e.stopPropagation()}
                        onCheckedChange={() => {
                          toggleStatus(hospede.id, hospede.status);
                        }}
                        className="cursor-pointer"
                      />
                    </TableCell>
                    <TableCell className="text-center space-x-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          editHospede(hospede.id);
                        }}
                        className="px-3 py-1 bg-blue-500 text-white rounded text-sm"
                      >
                        Editar
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteHospede(hospede.id);
                        }}
                        className="px-3 py-1 bg-red-500 text-white rounded text-sm"
                      >
                        Deletar
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </div>
    </div>
  );
}
