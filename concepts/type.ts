export type Hospede = {
  nomeCompleto: string;
  email: string;
  telefone: string;
  cpf: string;
  dataNascimento: string;
  endereco: Endereco;
  status: HospedeStatus;
};

export type Endereco = {
  cep: string;
  logradouro: string;
  bairro: string;
  numero: string;
  complemento: string;
  cidade: string;
  estado: string;
};

export type HospedeStatus = "ATIVO" | "INATIVO";
