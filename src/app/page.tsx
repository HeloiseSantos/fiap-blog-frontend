import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { LogInIcon } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="container mx-auto h-16 border-b-2 border-slate-400 shadow-md flex items-center justify-between px-4">
        <div>
          <Link href="/" legacyBehavior passHref>Education Blog</Link>
        </div>

        <div className="flex items-center space-x-4">
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
        </div>
      </div>
    </>
  );
}
