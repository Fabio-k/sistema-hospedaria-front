"use client";
import { Button } from "@/components/ui/button";
import {
  FieldGroup,
  FieldSet,
  FieldLegend,
  FieldDescription,
  FieldSeparator,
  FieldLabel,
  Field,
  FieldError,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import z from "zod";

const formSchema = z.object({
  id: z.number().optional(),
  status: z.enum(["ATIVO", "INATIVO"]).optional(),
  nomeCompleto: z.string().min(2, {
    message: "O nome completo deve ter pelo menos 2 caracteres",
  }),
  email: z.email(),
  telefone: z.string(),
  endereco: z.object({
    cep: z.string().min(8, {
      message: "O CEP deve ter pelo menos 8 caracteres",
    }),
    logradouro: z.string().nonempty({
      message: "O logradouro é obrigatório",
    }),
    bairro: z.string(),
    numero: z.string(),
    complemento: z.string(),
    cidade: z.string(),
    estado: z.string(),
  }),

  cpf: z.string().min(11, {
    message: "O CPF deve ter pelo menos 11 caracteres",
  }),
  dataNascimento: z.string(),
});

type Hospede = z.infer<typeof formSchema>;
export default function Page() {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nomeCompleto: "",
      email: "",
      telefone: "",
      endereco: {
        cep: "",
        logradouro: "",
        bairro: "",
        numero: "",
        complemento: "",
        cidade: "",
        estado: "",
      },
      cpf: "",
      dataNascimento: "",
    },
  });

  function onSubmit(data: Hospede) {
    axios
      .post(process.env.NEXT_PUBLIC_API_URL + "/hospede", data)
      .then(function (response) {
        router.push("/");
      });
  }

  return (
    <div className="flex items-center justify-center">
      <div className="bg-white rounded shadow mt-8 w-full max-w-6xl p-8">
        <h1 className="text-3xl font-bold text-gray-900">Novo hóspede</h1>
        <form id="new-hospede-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <FieldSet>
              <FieldLegend>Dados Pessoais</FieldLegend>
              <FieldDescription>Preencha os dados do hóspede</FieldDescription>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <Controller
                  name="nomeCompleto"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="form-nome-completo">
                        Nome Completo
                      </FieldLabel>
                      <Input
                        {...field}
                        id="form-nome-completo"
                        aria-invalid={fieldState.invalid}
                        placeholder="Insira o nome completo"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                <Controller
                  name="email"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="form-email">E-mail</FieldLabel>
                      <Input
                        {...field}
                        id="form-email"
                        type="email"
                        placeholder="email@exemplo.com"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                <Controller
                  name="telefone"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="form-telefone">Telefone</FieldLabel>
                      <Input
                        {...field}
                        id="form-telefone"
                        placeholder="(99) 9 9999-9999"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                <Controller
                  name="cpf"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="form-cpf">CPF</FieldLabel>
                      <Input
                        {...field}
                        id="form-cpf"
                        placeholder="000.000.000-00"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                <Controller
                  name="dataNascimento"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="form-data-nascimento">
                        Data de Nascimento
                      </FieldLabel>
                      <Input {...field} id="form-data-nascimento" type="date" />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </div>
            </FieldSet>

            <FieldSeparator />

            <FieldSet>
              <FieldLegend>Endereço</FieldLegend>
              <FieldDescription>Dados de endereço do hóspede</FieldDescription>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <Controller
                  name="endereco.cep"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="form-cep">CEP</FieldLabel>
                      <Input {...field} id="form-cep" placeholder="00000-000" />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  name="endereco.logradouro"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="form-logradouro">
                        Logradouro
                      </FieldLabel>
                      <Input
                        {...field}
                        id="form-logradouro"
                        placeholder="Rua, Avenida..."
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                <Controller
                  name="endereco.bairro"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="form-bairro">Bairro</FieldLabel>
                      <Input {...field} id="form-bairro" placeholder="Bairro" />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                <Controller
                  name="endereco.numero"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="form-numero">Número</FieldLabel>
                      <Input {...field} id="form-numero" placeholder="123" />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                <Controller
                  name="endereco.complemento"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="form-complemento">
                        Complemento
                      </FieldLabel>
                      <Input
                        {...field}
                        id="form-complemento"
                        placeholder="Apto, bloco..."
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                <Controller
                  name="endereco.cidade"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="form-cidade">Cidade</FieldLabel>
                      <Input {...field} id="form-cidade" placeholder="Cidade" />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                <Controller
                  name="endereco.estado"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="form-estado">Estado</FieldLabel>
                      <Input {...field} id="form-estado" placeholder="Estado" />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </div>
            </FieldSet>

            <FieldSeparator />

            <Field orientation="horizontal">
              <div className="flex justify-end space-x-2 mt-6">
                <Button type="submit">Salvar</Button>
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => form.reset()}
                >
                  Cancelar
                </Button>
              </div>
            </Field>
          </FieldGroup>
        </form>
      </div>
    </div>
  );
}
