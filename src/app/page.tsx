'use client'
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Loader2, LogInIcon } from "lucide-react";
import Link from "next/link";

interface Post {
  id: number;
  title: string;
  author: string;
  description: string;
  createDate: string;
  updateDate: string;
}

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch("https://fiap-blog-backend-latest.onrender.com/posts");
        if (!response.ok) {
          throw new Error(`Erro HTTP! Status: ${response.status}`);
        }
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("Ocorreu um erro desconhecido!");
        }
        console.error("Erro ao buscar posts:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center content-center h-screen"><Loader2 className="animate-spin" size={48} /></div>;
  }

  if (error) {
    return <div className="flex items-center justify-center content-center h-screen"><p className="border border-slate-200 rounded-lg p-4 m-4">Desculpe, ocorreu um erro ao carregar os posts. Por favor, atualize a página ou tente novamente mais tarde. Erro: {error}</p></div>;
  }
  
  return (
    <>
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

      <main className="container mx-4 mb-10">
        <section className="flex items-center my-10">
          <p className="mr-2">Você está em: </p>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbPage>Posts</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </section>

        <section className="mb-10">
          <h1 className="text-3xl font-bold">Posts cadastrados</h1>
        </section>

        <section className="grid grid-cols-3 gap-2">
          {posts.map((post) => (
            <Card key={post.id} className="max-w-screen-md">
              <CardHeader>
                <CardTitle>{ post.title }</CardTitle>
                <CardDescription>{ post.author }</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="line-clamp-3">{ post.description }</p>
              </CardContent>
              <CardFooter>
                <Button>
                  Acessar post
                </Button>
              </CardFooter>
            </Card>
          ))}
        </section>
      </main>

      <footer>
        <div className="container mx-auto p-4 text-center border border-slate-200">
          <p>© 2024 - Feito por Heloíse Santos e Jonas Moreira - FIAP</p>
        </div>
      </footer>
    </>
  );
}
