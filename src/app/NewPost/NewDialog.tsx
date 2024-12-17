'use client'
import React from 'react';
import { useState } from 'react';
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

const NewDialog = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [description, setDescription] = useState('');
    const [createDate, setCreateDate] = useState('');
    const [updateDate, setUpdateDate] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch('https://fiap-blog-backend-latest.onrender.com/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title,
                    author,
                    description,
                    createDate,
                    updateDate,
                }),
            });

            if (!response.ok) {
                throw new Error(`Erro HTTP! Status: ${response.status}`);
            }

            alert("Post cadastrado com sucesso!");
            
            window.location.reload();
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError('Ocorreu um erro desconhecido!');
            }
            console.error('Erro ao cadastrar post:', error);
        }
    };

    return (
        <>
            <div>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="ghost" className="max-w-full hover:bg-gray-200 active:bg-gray-300 transition-colors">
                            Cadastrar novo post
                        </Button>
                    </DialogTrigger>

                    <DialogContent className="max-w-screen-lg w-full overflow-scroll max-md:h-4/5">
                        <DialogHeader className="flex items-center">
                            <DialogTitle>Cadastrar novo post</DialogTitle>
                        </DialogHeader>

                        {error && <p className="text-red-500 mb-4">{error}</p>}
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <Label htmlFor="title">Título</Label>
                                <Input type="title" placeholder="Título do post" value={title} className="w-full p-2 border border-gray-300 rounded mt-1" onChange={(e) => setTitle(e.target.value)} required />
                            </div>

                            <div className="mb-4">
                                <Label htmlFor="author">Autor</Label>
                                <Input type="author" placeholder="Nome do autor do post" value={author} className="w-full p-2 border border-gray-300 rounded mt-1" onChange={(e) => setAuthor(e.target.value)} required />
                            </div>

                            <div className="mb-4">
                                <Label>Conteúdo</Label>
                                <Textarea placeholder="Conteúdo do post" value={description} className="w-full h-64 p-2 border border-gray-300 rounded mt-1" onChange={(e) => setDescription(e.target.value)} required />
                            </div>

                            <div className="mb-4">
                                <Label htmlFor="createDate">Data de criação</Label>
                                <Input
                                    type="date"
                                    id="createDate"
                                    value={createDate}
                                    onChange={(e) => setCreateDate(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded mt-1 cursor-pointer"
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <Label htmlFor="updateDate">Data de atualização</Label>
                                <Input
                                    type="date"
                                    id="updateDate"
                                    value={updateDate}
                                    onChange={(e) => setUpdateDate(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded mt-1 cursor-pointer"
                                    required
                                />
                            </div>

                            <DialogFooter className="flex justify-center w-full mt-4">
                                <Button
                                    type="submit"
                                >
                                    Salvar
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
        </>
    );
}

export default NewDialog;