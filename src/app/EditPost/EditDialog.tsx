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
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(
          `https://fiap-blog-backend-latest.onrender.com/posts/${postId}`
        );
        const post = await response.json();
        setTitle(post.title);
        setDescription(post.description);
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
          body: JSON.stringify({ title, description }),
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao editar o post");
      }

      const updatedPost = await response.json();
      console.log("Post editado com sucesso:", updatedPost);

      alert("Post editado com sucesso!");
      window.location.reload();
    } catch (error) {
      console.error("Erro ao editar o post:", error);
    }
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="secondary" className="max-w-full mr-4">
            Editar post
          </Button>
        </DialogTrigger>

        <DialogContent className="max-w-screen-lg w-full">
          <DialogHeader className="flex items-center">
            <DialogTitle>Editar Post</DialogTitle>
          </DialogHeader>

          <form className="space-y-6">
            <div className="grid w-full gap-1.5">
              <Label htmlFor="Título">Título</Label>
              <Input
                id="Título"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                disabled={loading}
                required
              />
            </div>
            <div>
              <Label htmlFor="Conteúdo do Post">Conteúdo do Post</Label>
              <Textarea
                id="Conteúdo do Post"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full h-64 border rounded-md p-2"
                disabled={loading}
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
