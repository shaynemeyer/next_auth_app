"use client";

import { Button } from "@/components/ui/button";
import { logout } from "./actions";

function LogoutButton() {
  return (
    <Button
      size="sm"
      onClick={async () => {
        await logout();
      }}
    >
      Logout
    </Button>
  );
}
export default LogoutButton;
