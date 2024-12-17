import React from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";

interface EditDialogProps {
  postId: string;
}

const EditDialog: React.FC<EditDialogProps> = ({ postId }) => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [updateDate, setUpdateDate] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(
          `https://fiap-blog-backend-latest.onrender.com/posts/${postId}`
        );

        const post = await response.json();

        setTitle(post.title);
        setDescription(post.description);
        setUpdateDate(post.updateDate);

        setLoading(false);
      } catch (error) {
        console.error("Erro ao recuperar o post:", error);
        setLoading(false);
      }
    };

    if (postId) {
      fetchPost();
    }
  }, [postId]);

  const handleEditPost = async (postId: string) => {
    try {
      setLoading(true);

      const response = await fetch(
        `https://fiap-blog-backend-latest.onrender.com/posts/${postId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title, description, updateDate }),
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao editar o post");
      }

      alert("Post editado com sucesso!");

      window.location.reload();
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
    } else {
      setError('Ocorreu um erro desconhecido!');
    }
      console.error("Erro ao editar o post:", error);
    }
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('pt-BR', options);
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="secondary" className="max-w-full mr-4 hover:bg-gray-200 active:bg-gray-300 transition-colors max-lg:mr-0 max-lg:mb-4">
            Editar
          </Button>
        </DialogTrigger>

        <DialogContent className="max-w-screen-lg w-full">
          <DialogHeader className="fflex items-center border-b pb-5 border-slate-200">
            <DialogTitle className="text-2xl">Editar Post</DialogTitle>
          </DialogHeader>

          {error && <p className="text-red-500 mb-4">{error}</p>}
          <form className="space-y-6">
            <div className="mb-4">
              <Label htmlFor="Título">Título</Label>
              <Input
                id="Título"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                disabled={loading}
                placeholder="Título do post"
                required
              />
            </div>

            <div className="mb-4">
              <Label htmlFor="Conteúdo do Post">Conteúdo do Post</Label>
              <Textarea
                id="Conteúdo do Post"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full h-64 border rounded-md p-2"
                disabled={loading}
                placeholder="Conteúdo do post"
                required
              />
            </div>

            <div>
              <Label htmlFor="updateDate">Data de atualização</Label>
              <Input
                id="updateDate"
                value={formatDate(updateDate)}
                onChange={(e) => setUpdateDate(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded mt-1 cursor-pointer"
                disabled={loading}
                placeholder="dd/mm/aaaa"
                required
              />
            </div>

            <DialogFooter className="flex justify-center w-full mt-4">
              <Button
                type="submit"
                disabled={loading}
                onClick={() => handleEditPost(postId)}
              >
                {loading ? "Carregando..." : "Salvar"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditDialog;
