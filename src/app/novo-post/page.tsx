'use client'
import React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

export default function NovoPost() {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

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
                    description
                }),
            });
            if (!response.ok) {
                throw new Error(`Erro HTTP! Status: ${response.status}`);
            }
            router.push('/');
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
        <div className="container mx-auto p-4">
            <h2 className="text-3xl font-bold mb-4">Cadastrar Novo Post</h2>
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
                    <Label>Descrição</Label>
                    <Textarea placeholder="Descrição do post" value={description} className="w-full p-2 border border-gray-300 rounded mt-1" onChange={(e) => setDescription(e.target.value)} required />
                </div>

                <Button type="submit">Cadastrar</Button>
            </form>
        </div>
    );
}