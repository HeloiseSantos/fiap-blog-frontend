import React, { use } from "react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { LogInIcon } from "lucide-react";
import { useAuth0 } from "@auth0/auth0-react";

const Header = () => {
  const { loginWithRedirect, logout, user, isLoading } = useAuth0();

  console.log("User: ", user)
  console.log("isLoading: ", isLoading)

  return (
    <header className="container mx-auto h-16 border-b border-slate-200 shadow-md flex items-center justify-between px-4">
      <div>
        <Link href="/" legacyBehavior passHref>
          Blog educacional
        </Link>
      </div>

      {!isLoading && user && (
        <div>
        Logado como <strong>{ user?.name }</strong>
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
              <NavigationMenuItem>
                <Link href="/sobre" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Sobre
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div>
          {!isLoading && !user && (
            <Button
              className="btn btn-primary btn-block"
              onClick={() => loginWithRedirect()}
            >
              <LogInIcon /> Login
            </Button>
          )}

          {!isLoading && user && (
            <Button
              className="btn btn-primary btn-block"
              onClick={() => logout()}
            >
              Log Out
            </Button>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
