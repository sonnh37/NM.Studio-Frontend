import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import * as SelectPrimitive from "@radix-ui/react-select";
import { AnyFieldApi } from "@tanstack/react-form";
import { EnumOption } from "../utils/enum-utils";
import { FieldCommonProps } from "./field-common-props";

interface FieldSelectEnumsProps
  extends React.ComponentProps<typeof SelectPrimitive.Root>,
    FieldCommonProps {
  enumOptions: EnumOption[];
}

export const FieldSelectEnums = ({
  field,
  placeholder,
  disabled,
  enumOptions,
  label,
  ...props
}: FieldSelectEnumsProps) => {
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  return (
    <Field data-invalid={isInvalid}>
      <FieldLabel htmlFor={field.name}>{label || field.name}</FieldLabel>
      <Select
        key={field.state.value}
        onValueChange={(value) => {
          field.handleChange(Number(value));
        }}
        value={field.state.value?.toString()}
        disabled={disabled}
        {...props}
      >
        <SelectTrigger>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {enumOptions.map((option) => (
            <SelectItem key={option.value} value={option.value.toString()}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {isInvalid && <FieldError errors={field.state.meta.errors} />}
    </Field>
  );
};
