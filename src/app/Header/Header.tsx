import React from 'react'
import { Button } from "@/components/ui/button";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
  } from "@/components/ui/navigation-menu";
  import { LogInIcon } from "lucide-react";
import Link from "next/link";

const Header = () => {
  return (
    <header className="container mx-auto h-16 border-b border-slate-200 shadow-md flex items-center justify-between px-4">
        <div>
          <Link href="/" legacyBehavior passHref>Blog educacional</Link>
        </div>

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
            <Button>
              <LogInIcon /> Login
            </Button>
          </div>
        </nav>
      </header>
  )
}

export default Header