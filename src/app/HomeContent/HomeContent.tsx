import React from "react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { Input } from "@/components/ui/input";
import { useAuth0 } from "@auth0/auth0-react";
import EditDialog from "../EditPost/EditDialog";
import ViewPostDialog from "../ViewPost/ViewPostDialog";

interface Post {
  _id: string;
  title: string;
  author: string;
  description: string;
  createDate: string;
  updateDate: string;
}

const HomeContent = () => {
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL || "https://localhost:3000";

  const { user, isLoading, isAuthenticated } = useAuth0();

  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [roles, setRoles] = useState<string[]>([]);

  useEffect(() => {
    setRoles(user?.[baseURL + "/roles"] || []);
  }, [user, isAuthenticated, baseURL]);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch(
          "https://fiap-blog-backend-latest.onrender.com/posts"
        );

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

  const handleSearch = async () => {
    setLoading(true);
    try {
      const endpoint = searchTerm
        ? `https://fiap-blog-backend-latest.onrender.com/posts/search?q=${searchTerm}`
        : `https://fiap-blog-backend-latest.onrender.com/posts`;

      const response = await fetch(endpoint);

      if(searchTerm.length === 0) {
        alert("Digite um termo para pesquisar!");
      }

      if (!response.ok) {
        throw new Error(`Erro HTTP! Status: ${response.status}`);
      }

      const data = await response.json();
      setPosts(data);

      if(data.length === 0) {
        alert("Nenhum post encontrado com o termo pesquisado!");

        window.location.reload();
      }
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
  };

  const handleClearSearch = () => {
    setSearchTerm("");
  };

  if (loading || isLoading) {
    return (
      <div className="flex items-center justify-center content-center h-screen">
        <Loader2 className="animate-spin" size={48} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center content-center h-screen">
        <p className="border border-slate-200 rounded-lg p-4 m-4">
          Desculpe, ocorreu um erro ao carregar os posts. Por favor, atualize a
          página ou tente novamente mais tarde. Erro: {error}
        </p>
      </div>
    );
  }

  const handleDeletePost = async (postId: string) => {
    const confirmed = window.confirm(
      "Você tem certeza que deseja excluir este post?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await fetch(
        `https://fiap-blog-backend-latest.onrender.com/posts/${postId}`,
        {
          method: "DELETE",
        }
      );

      setPosts(posts.filter((post) => post._id !== postId));

      alert("Post excluído com sucesso!");

      window.location.reload();
    } catch (error) {
      console.error("Erro ao excluir o post:", error);
    }
  };

  return (
    <div id="root">
      <Header user={user} roles={roles} isLoading={isLoading} />

      <section className="flex items-center mb-10 mt-14 max-md:hidden">
        <img src="full-banner.jpg" alt="Banner" className="w-full"/>
      </section>

      <main className="mb-10 px-4 max-md:mt-44">
        <section className="mb-10">
          <h1 className="text-3xl font-bold text-center">Posts cadastrados</h1>
        </section>

        <section className="mb-4">
          <div className="flex items-center max-md:flex-col">
            <Input
              type="text"
              placeholder="Digite o título do post que deseja encontrar"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-4 border border-gray-300 rounded mr-4 max-md:mr-0"
            />

            <div className="flex items-center max-md:pt-4 max-md:w-full">
              <Button
                variant="secondary"
                onClick={handleClearSearch}
                className="mr-4 hover:bg-gray-200 active:bg-gray-300 transition-colors max-md:w-full"
              >
                Limpar
              </Button>

              <Button onClick={handleSearch} className="max-md:w-full">Buscar</Button>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.map((post) => (
            <Card key={post._id} className="max-w-screen-md">
              <CardHeader>
                <CardTitle className="truncate">{post.title}</CardTitle>
                <CardDescription>{post.author}</CardDescription>
              </CardHeader>

              <CardContent>
                <p className="line-clamp-3">{post.description}</p>
              </CardContent>

              <CardFooter className="flex justify-between max-lg:flex-col-reverse max-lg:w-full">
                {roles?.includes("Teacher") && (
                  <Button
                    variant="destructive"
                    className="max-w-full mr-4 max-lg:mr-0"
                    onClick={() => handleDeletePost(post._id)}
                  >
                    Excluir
                  </Button>
                )}

                {roles?.includes("Teacher") && <EditDialog postId={post._id} />}

                <ViewPostDialog postId={post._id} />
              </CardFooter>
            </Card>
          ))}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default HomeContent;
