import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";

interface ViewPostDialogProps {
  postId: string;
}

interface Post {
  title: String;
  author: String;
  description: String;
  createDate: String;
  updateDate: String;
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

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="max-w-full mr-4">Acessar post</Button>
        </DialogTrigger>

        <DialogContent className="max-w-screen-lg w-full">
          <DialogHeader className="flex items-center border-b pb-5 border-slate-200">
            <DialogTitle className="text-2xl">{title}</DialogTitle>
          </DialogHeader>

          <section>
            <p className="mb-4">
              <b>Autor:</b> {author} 
            </p>

            <p className="mb-4">
              <b>Data de criação:</b> {createDate}
            </p>

            <p className="mb-4">
              <b>Data da última atualização:</b> {updateDate}
            </p>

            <p>{description}</p>
          </section>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ViewPostDialog;
