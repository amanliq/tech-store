import type {
  UseFormRegister,
  FieldError,
  FieldValues,
  Path,
} from "react-hook-form";
import { Label } from "../Label";
import { Input } from "./Input";

interface FormInputProps<
  T extends FieldValues = FieldValues,
> extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  error?: FieldError;
}

export const FormInput = <T extends FieldValues = FieldValues>({
  label,
  name,
  register,
  error,
  ...props
}: FormInputProps<T>) => {
  return (
    <div className="flex flex-col w-full gap-2">
      <Label htmlFor={name}>{label}</Label>

      <Input
        id={name}
        {...register(name)}
        {...props}
        className={error ? "error" : ""}
      />

      {error && (
        <span className="text-red-500 text-[11px]">{error.message}</span>
      )}
    </div>
  );
};
