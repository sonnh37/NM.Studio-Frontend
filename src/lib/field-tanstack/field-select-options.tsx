import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AnyFieldApi } from "@tanstack/react-form";
import { useRef } from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { FieldCommonProps } from "./field-common-props";

interface FieldSelectOptionsProps
  extends React.ComponentProps<typeof SelectPrimitive.Root>,
    FieldCommonProps {
  selectValue: string;
  selectLabel: string;
  options: any[];
}

export const FieldSelectOptions = ({
  field,
  placeholder,
  disabled,
  options,
  selectValue,
  selectLabel,
  label,
  ...props
}: FieldSelectOptionsProps) => {
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  return (
    <Field data-invalid={isInvalid}>
      <FieldLabel htmlFor={field.name}>{label || field.name}</FieldLabel>
      <Select
        onValueChange={(value) => field.handleChange(value)}
        value={field.state.value ?? undefined}
        disabled={disabled}
        {...props}
      >
        <SelectTrigger>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option[selectValue]} value={option[selectValue]}>
              {option[selectLabel]}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {isInvalid && <FieldError errors={field.state.meta.errors} />}
    </Field>
  );
};
