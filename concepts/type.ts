export type Hospede = {
  nomeCompleto: string;
  email: string;
  telefone: string;
  cpf: string;
  cep: string;
  logradouro: string;
  bairro: string;
  numero: string;
  complemento: string;
  cidade: string;
  estado: string;
  pais: string;
};

export type HospedeStatus = "ATIVO" | "INATIVO";
