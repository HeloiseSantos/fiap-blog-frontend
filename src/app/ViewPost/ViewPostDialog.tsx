import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

interface ViewPostDialogProps {
  postId: string;
}

const ViewPostDialog: React.FC<ViewPostDialogProps> = ({ postId }) => {
  const [title, setTitle] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [createDate, setCreateDate] = useState<string>("");
  const [updateDate, setUpdateDate] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(
          `https://fiap-blog-backend-latest.onrender.com/posts/${postId}`
        );

        const post = await response.json();

        setTitle(post.title);
        setAuthor(post.author);
        setDescription(post.description);
        setCreateDate(post.createDate);
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

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('pt-BR', options);
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="max-w-full mr-4 max-lg:mr-0 max-lg:mb-4">Ler post</Button>
        </DialogTrigger>

        <DialogContent className="max-w-screen-lg w-full max-md:overflow-scroll h-full max-md:h-4/5">
          <DialogHeader className="flex items-center border-b pb-5 border-slate-200">
            <DialogTitle className="text-2xl">{title}</DialogTitle>
          </DialogHeader>

          <section>
            <p className="mb-4">
              <b>Autor:</b> {author} 
            </p>

            <p className="mb-4">
              <b>Data de criação:</b> {formatDate(createDate)}
            </p>

            <p className="mb-4">
              <b>Data da última atualização:</b> {formatDate(updateDate)}
            </p>

            <p>{description}</p>
          </section>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ViewPostDialog;
