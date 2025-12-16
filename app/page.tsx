"use client";
import { useEffect, useMemo, useState } from "react";
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
import { Input } from "@/components/ui/input";
import FiltroHospede from "@/concepts/hospede/filtro";
import { useFiltro } from "@/concepts/hospede/context";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import usePagination from "@/concepts/context/paginationContext";
import { useSistemaHospedariaApi } from "@/utils/sistemaHospedariaApi";
import { useSession } from "next-auth/react";

export default function Home() {
  const [hospedes, setHospedes] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const { data: session, status: loginStatus } = useSession();
  const { idade, status, showRemoved } = useFiltro();
  const {
    page,
    setPage,
    hasPreviousPage,
    hasNextPage,
    fillData,
    getDisplayPages,
    totalCount,
  } = usePagination();

  const router = useRouter();

  const api = useSistemaHospedariaApi();

  const isPermitted = useMemo(() => {
    return {
      editHospede: session?.roles?.includes("hospede:edit") ?? false,
      editStatus: session?.roles?.includes("hospede:status") ?? false,
      delete: session?.roles?.includes("hospede:delete") ?? false,
      viewDeleted: session?.roles?.includes("hospede:view:deleted") ?? false,
    }
  }, [session?.roles])

  async function getHospedes(): Promise<void> {
    try {
      setLoading(true);
      api
        .get(`/hospedes`, {
          params: {
            termo: search,
            minIdade: idade[0],
            maxIdade: idade[1],
            includeDeleted: showRemoved,
            status: status.length > 0 ? status.join(",") : null,
            page: page,
          },
        })
        .then((res) => {
          fillData(res.data);
          setHospedes(res.data.content);
        });
    } catch (err: any) {
      console.error("Failed to load hospedes", err);
      setError(err?.message ?? "Erro ao carregar hóspedes");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if(loginStatus === "authenticated" && session?.accessToken) {
      getHospedes();
    }
  }, [idade, status, page, showRemoved, loginStatus, session?.accessToken]);

  async function toggleStatus(id: string | number, hospedeStatus: string) {
    const action = hospedeStatus === "ATIVO" ? "inativar" : "ativar";
    const targetStatus = hospedeStatus === "ATIVO" ? "INATIVO" : "ATIVO";

    try {
      await api.patch(
        `/hospede/${id}/${action}`);
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
      const res = await api
        .delete(`/hospede/${id}`)
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
          <div className="flex gap-4 items-center">
            <h1 className="text-xl font-semibold">Hóspedes</h1>
            <Input
              type="text"
              placeholder="pesquisar"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key == "Enter") {
                  getHospedes();
                }
              }}
            />
            <FiltroHospede />
            <div className="flex-shrink-0">
              <p>{totalCount} hóspedes encontrados</p>
            </div>
          </div>

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
                        disabled={!isPermitted.editStatus}
                        onClick={(e) => e.stopPropagation()}
                        onCheckedChange={() => {
                          toggleStatus(hospede.id, hospede.status);
                        }}
                        className="cursor-pointer"
                      />
                    </TableCell>
                    <TableCell className="text-center space-x-2">
                      {isPermitted.editHospede && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          editHospede(hospede.id);
                        }}
                        className="px-3 py-1 bg-blue-500 text-white rounded text-sm"
                      >
                        Editar
                      </button>
                      )}
                      {isPermitted.delete && (
                        <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteHospede(hospede.id);
                        }}
                        className="px-3 py-1 bg-red-500 disabled:opacity-50 text-white rounded text-sm"
                      >
                        Deletar
                      </button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
                {hospedes.length < 10 &&
                  Array.from({ length: 10 - hospedes.length }).map((_, i) => (
                    <TableRow
                      key={`placeholder-${i}`}
                      className="invisible pointer-events-none"
                    >
                      <TableCell>
                        <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm">
                          Editar
                        </button>
                      </TableCell>
                      <TableCell>placeholder</TableCell>
                      <TableCell>placeholder</TableCell>
                      <TableCell>placeholder</TableCell>
                      <TableCell>placeholder</TableCell>
                      <TableCell>placeholder</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          )}
        </div>
      </div>
      <Pagination className="mt-4">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              isActive={hasPreviousPage}
              onClick={() => setPage(page - 1)}
            />
          </PaginationItem>
          {getDisplayPages().map((pagePagination) => (
            <PaginationItem key={pagePagination}>
              <PaginationLink
                isActive={pagePagination === page}
                onClick={() => setPage(pagePagination)}
              >
                {pagePagination}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              isActive={hasNextPage}
              onClick={() => {
                if (hasNextPage) {
                  setPage(page + 1);
                }
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
