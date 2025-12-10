import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const ERROR_MESSAGES = {
  "cpf.obrigatorio": "O CPF é obrigatório.",
  "email.obrigatorio": "O e-mail é obrigatório.",
  "telefone.obrigatorio": "O telefone é obrigatório.",
  "nomeCompleto.obrigatorio": "O nome completo é obrigatório.",

  "endereco.cep.obrigatorio": "O CEP é obrigatório.",
  "endereco.cidade.obrigatorio": "A cidade é obrigatória.",
  "endereco.complemento.obrigatorio": "O complemento é obrigatório.",
  "endereco.bairro.obrigatorio": "O bairro é obrigatório.",
  "endereco.estado.obrigatorio": "O estado é obrigatório.",
  "endereco.numero.obrigatorio": "O número é obrigatório.",
  "endereco.logradouro.obrigatorio": "O logradouro é obrigatório.",

  "dataNascimento.obrigatorio": "A data de nascimento é obrigatória.",
  "cpf.jaUsado": "O CPF ja foi utilizado.",
  "cpf.formatoInvalido": "O CPF deve ser válido",

  "email.jaUsado": "O e-mail já foi utilizado.",
  "email.formatoInvalido": "O e-mail deve ser válido.",
  generalError: "Algo deu errado, tente novamente.",
} as const satisfies Record<string, string>;

export type ErrorMessageKey = keyof typeof ERROR_MESSAGES;
