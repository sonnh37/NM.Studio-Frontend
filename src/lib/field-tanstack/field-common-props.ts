import { AnyFieldApi } from "@tanstack/react-form";

export interface FieldCommonProps {
  field: AnyFieldApi;
  placeholder?: string;
  label?: string;
  disabled?: boolean;
}
