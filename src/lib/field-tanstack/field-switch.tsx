import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Switch } from "@/components/ui/switch";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import { AnyFieldApi } from "@tanstack/react-form";
import { FieldCommonProps } from "./field-common-props";

// Define a simplified type for textarea fields
interface FieldSwitchProps
  extends React.ComponentProps<typeof SwitchPrimitive.Root>,
    FieldCommonProps {}

export const FieldSwitch = ({
  field,
  placeholder,
  disabled,
  label,
  ...props
}: FieldSwitchProps) => {
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  return (
    <Field data-invalid={isInvalid} orientation={"horizontal"}>
      <FieldContent>
        <FieldLabel htmlFor={field.name}>{label || field.name}</FieldLabel>
        <FieldDescription>{placeholder}</FieldDescription>
      </FieldContent>
      <Switch
        id={field.name}
        disabled={disabled}
        onBlur={field.handleBlur}
        aria-invalid={isInvalid}
        checked={field.state.value}
        onCheckedChange={field.handleChange}
        {...props}
      />
      {isInvalid && <FieldError errors={field.state.meta.errors} />}
    </Field>
  );
};
