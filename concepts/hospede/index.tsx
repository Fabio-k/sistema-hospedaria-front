import { Button } from "@/components/ui/button";
import {
  FieldGroup,
  FieldSet,
  FieldLegend,
  FieldDescription,
  FieldSeparator,
  Field,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import ControlledField from "../ControlledField";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

const formSchema = z.object({
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

const basicHospedeData = [
  {
    name: "nomeCompleto",
    label: "Nome completo",
    type: "text",
    placeholder: "Insira o nome completo",
  },
  {
    name: "email",
    label: "E-mail",
    type: "email",
    placeholder: "email@exemplo.com",
  },
  {
    name: "telefone",
    label: "Telefone",
    type: "tel",
    placeholder: "(00) 00000-0000",
  },
  {
    name: "cpf",
    label: "CPF",
    type: "text",
    placeholder: "000.000.000-00",
  },
  {
    name: "dataNascimento",
    label: "Data de nascimento",
    type: "date",
    placeholder: "00/00/0000",
  },
];

const addressData = [
  {
    name: "endereco.cep",
    label: "CEP",
    type: "text",
    placeholder: "00000-000",
  },
  {
    name: "endereco.logradouro",
    label: "Logradouro",
    type: "text",
    placeholder: "Rua",
  },
  {
    name: "endereco.bairro",
    label: "Bairro",
    type: "text",
    placeholder: "Bairro",
  },
  {
    name: "endereco.numero",
    label: "Número",
    type: "text",
    placeholder: "Número",
  },
  {
    name: "endereco.complemento",
    label: "Complemento",
    type: "text",
    placeholder: "Complemento",
  },
  {
    name: "endereco.cidade",
    label: "Cidade",
    type: "text",
    placeholder: "Cidade",
  },
  {
    name: "endereco.estado",
    label: "Estado",
    type: "text",
    placeholder: "Estado",
  },
];

function HospedeForm({
  defaultValues = {
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
  onSubmit,
  title,
}: {
  defaultValues?: any;
  onSubmit: (data: any) => void;
  title: string;
}) {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
  });

  return (
    <div className="flex items-center justify-center">
      <div className="bg-white rounded shadow mt-8 w-full max-w-6xl p-8">
        <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
        <form id="new-hospede-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <FieldSet>
              <FieldLegend>Dados Pessoais</FieldLegend>
              <FieldDescription>Preencha os dados do hóspede</FieldDescription>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                {basicHospedeData.map((f) => (
                  <ControlledField
                    key={f.name}
                    name={f.name}
                    control={form.control}
                    label={f.label}
                    children={(field: any) => {
                      return (
                        <Input
                          {...field}
                          type={f.type}
                          id={field.name}
                          placeholder={f.placeholder}
                        />
                      );
                    }}
                  />
                ))}
              </div>
            </FieldSet>

            <FieldSeparator />

            <FieldSet>
              <FieldLegend>Endereço</FieldLegend>
              <FieldDescription>Dados de endereço do hóspede</FieldDescription>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                {addressData.map((f) => (
                  <ControlledField
                    key={f.name}
                    name={f.name}
                    control={form.control}
                    label={f.label}
                    children={(field: any) => {
                      return (
                        <Input
                          {...field}
                          type={f.type}
                          id={field.name}
                          placeholder={f.placeholder}
                        />
                      );
                    }}
                  />
                ))}
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

export default HospedeForm;
