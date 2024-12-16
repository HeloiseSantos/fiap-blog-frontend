import React from "react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { LogInIcon, LogOutIcon } from "lucide-react";
import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from "react";

const Header = () => {
  const { loginWithRedirect, logout, user, isLoading } = useAuth0();

  const [roles, setRoles] = useState<string[]>([]);

  useEffect(() => {
    setRoles(user?.["https://localhost:3000/roles"] || []);
  }, [user]);

  return (
    <header className="container mx-auto h-16 border-b border-slate-200 shadow-md flex items-center justify-between px-4">
      <div>
        <Link href="/" legacyBehavior passHref>
          Blog educacional
        </Link>
      </div>

      {!isLoading && user && (
        <div>
          Logado como <strong>{user?.name}</strong>
        </div>
      )}

      <nav className="flex items-center space-x-4">
        <div>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link href="/" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Posts
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              {roles.includes("Teacher") && (
                <NavigationMenuItem>
                  <Link href="/novo-post" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      Novo Post
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              )}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div>
          {!isLoading && !user && (
            <Button onClick={() => loginWithRedirect()}>
              <LogInIcon /> Login
            </Button>
          )}

          {!isLoading && user && (
            <Button onClick={() => logout()}>
              <LogOutIcon /> Log Out
            </Button>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
