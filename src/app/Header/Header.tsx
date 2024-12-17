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
import { User, useAuth0 } from "@auth0/auth0-react";

interface HeaderProps {
  user?: User;
  roles: string[];
  isLoading: boolean;
}

const Header: React.FC<HeaderProps> = ({ user, roles, isLoading }) => {
  const { loginWithRedirect, logout } = useAuth0();

  return (
    <header className="h-16 border-b border-slate-200 shadow-md flex items-center justify-between px-4">
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

              {roles?.includes("Teacher") && (
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
