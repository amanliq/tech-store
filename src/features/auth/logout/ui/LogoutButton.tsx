import { Button } from "@/shared/ui";
import { useLogout } from "../model/useLogout";

export const LogoutButton = () => {
  const { handleLogout } = useLogout();
  return (
    <Button variant="outline" onClick={handleLogout}>
      Logout
    </Button>
  );
};
