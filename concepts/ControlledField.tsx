import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Controller } from "react-hook-form";

interface ControlledFieldProps {
  name: string;
  control: any;
  label: string;
  children: (field: any) => React.ReactNode;
}

function ControlledField({
  name,
  control,
  label,
  children,
}: ControlledFieldProps) {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={""}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={field.name}>{label}</FieldLabel>

          {children(field)}

          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}

export default ControlledField;
