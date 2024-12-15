'use client'
import React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import Link from 'next/link';

export default function NovoPost() {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [description, setDescription] = useState('');
    const [createDate, setCreateDate] = useState('');
    const [updateDate, setUpdateDate] = useState('');
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3001/posts', {
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
        <>  
            <Header />

            <main className="mb-10 px-4">
                <section className="flex items-center mb-10 mt-16 pt-10">
                    <p className="mr-2">Você está em: </p>
                    <Breadcrumb>
                        <BreadcrumbList>
                        <BreadcrumbLink>
                            <Link href="/">Posts</Link>
                        </BreadcrumbLink>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage>Cadastrar novo post</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </section>

                <section>
                    <h2 className="text-3xl font-bold mb-4">Cadastrar novo post</h2>
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

                        <div className="flex justify-end">
                            <Button type="submit">Cadastrar</Button>
                        </div>
                    </form>
                </section>
            </main>
            
            <Footer />
        </>
    );
}