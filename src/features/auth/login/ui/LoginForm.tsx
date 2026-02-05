import {
  loginSchema,
  useLogin,
  type LoginFormData,
} from "@/features/auth/login";
import { ButtonLoading, FormInput } from "@/shared/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export const LoginForm = () => {
  const { mutateAsync, isPending, error } = useLogin();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    await mutateAsync(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 max-w-sm mx-auto mt-4 p-6 border rounded-lg"
    >
      <h2 className="text-2xl font-bold">Login</h2>
      {error?.message && (
        <span className="text-red-500 text-sm">{error?.message}</span>
      )}

      <div>
        <FormInput
          register={register}
          error={errors.username}
          type="text"
          label="Login"
          name="username"
        />
      </div>

      <div>
        <FormInput
          register={register}
          error={errors.password}
          type="password"
          label="Password"
          name="password"
          className="w-full p-2 border rounded"
        />
      </div>

      <span>michaelw / michaelwpass</span>
      <ButtonLoading
        isLoading={isPending}
        loadingText="Authenticating..."
        type="submit"
        className="w-full mt-3"
      >
        Sign In
      </ButtonLoading>
    </form>
  );
};
