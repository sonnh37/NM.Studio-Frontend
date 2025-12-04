import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { AnyFieldApi, FieldApi } from "@tanstack/react-form";
import { FieldCommonProps } from "./field-common-props";

// Define a simplified type for textarea fields
interface FieldTextareaProps
  extends React.ComponentProps<"textarea">,
    FieldCommonProps {}

export const FieldTextarea = ({
  field,
  placeholder,
  disabled,
  label,
  ...props
}: FieldTextareaProps) => {
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  return (
    <Field data-invalid={isInvalid}>
      <FieldLabel htmlFor={field.name}>{label || field.name}</FieldLabel>
      <Textarea
        id={field.name}
        value={field.state.value}
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        aria-invalid={isInvalid}
        {...props}
      />
      {isInvalid && <FieldError errors={field.state.meta.errors} />}
    </Field>
  );
};
