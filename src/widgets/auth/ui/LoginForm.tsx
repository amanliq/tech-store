import { Button, Input, Label } from "@/shared/ui";

export const LoginForm = () => {
  return (
    <form className="space-y-4 max-w-sm mx-auto mt-4 p-6 border rounded-lg">
      <h2 className="text-2xl font-bold">Login</h2>

      <div>
        <Label>Login</Label>
        <Input type="text" name="login" />
      </div>

      <div>
        <Label>Password</Label>
        <Input
          type="password"
          name="password"
          className="w-full p-2 border rounded"
        />
      </div>

      <Button type="submit" className="w-full">
        Sign In
      </Button>
    </form>
  );
};
