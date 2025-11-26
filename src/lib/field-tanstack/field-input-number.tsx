import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { AnyFieldApi } from "@tanstack/react-form";
import { useRef } from "react";
import { formatCurrency } from "../utils";
import { FieldCommonProps } from "./field-common-props";

interface FieldInputNumberProps
  extends React.ComponentProps<"input">,
    FieldCommonProps {}

export const FieldInputNumber = ({
  field,
  placeholder,
  disabled,
  label,
  ...props
}: FieldInputNumberProps) => {
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <Field data-invalid={isInvalid}>
      <FieldLabel htmlFor={field.name}>{label || field.name}</FieldLabel>
      <Input
        id={field.name}
        onBlur={field.handleBlur}
        placeholder={placeholder}
        disabled={disabled}
        aria-invalid={isInvalid}
        ref={inputRef}
        min="0"
        value={
          field.state.value !== undefined
            ? formatCurrency(field.state.value)
            : 0
        }
        onChange={(e) => {
          const rawValue = e.target.value.replace(/[^0-9]/g, "");
          const parsedValue = parseFloat(rawValue) || 0;

          // Update the field value
          field.handleChange(parsedValue);

          // Preserve cursor position
          if (inputRef.current) {
            const cursorPosition = e.target.selectionStart || 0;
            setTimeout(() => {
              inputRef.current?.setSelectionRange(
                cursorPosition,
                cursorPosition
              );
            }, 0);
          }
        }}
        {...props}
      />
      {isInvalid && <FieldError errors={field.state.meta.errors} />}
    </Field>
  );
};
