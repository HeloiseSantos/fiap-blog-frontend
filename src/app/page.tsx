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
        const response = await fetch("http://localhost:3000/posts");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unknown error occurred");
        }
        console.error("Error fetching posts:", error);
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
    return <div>Error: {error}</div>;
  }
  
  return (
    <>
      <section className="container mx-auto h-16 border-b border-slate-400 shadow-md flex items-center justify-between px-4">
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
      </section>

      <section className="flex items-center my-10 mx-4">
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
        <h1 className="text-3xl font-bold text-center">Posts cadastrados</h1>
      </section>

      <section className="px-4 grid grid-cols-3 gap-2">
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
    </>
  );
}
