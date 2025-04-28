import { json, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

// Defina o loader para buscar os dados do servidor
export const loader: LoaderFunction = async () => {
    const response = await fetch("http://localhost:5042/api/Users"); // URL corrigida
    if (!response.ok) {
        throw new Response("Erro ao buscar os dados", { status: response.status });
    }
    const data = await response.json();
    return json(data); // Retorna os dados como JSON
};

export default function Data() {
    const userList = useLoaderData(); // Obtém os dados do loader
    return (
        <div className="flex flex-row gap-4">
            {userList
                .sort((a: { ranking: number }, b: { ranking: number }) => a.ranking - b.ranking)
                .map((user: { ranking: number; name: string; chave: number }) => (
                    <div key={user.ranking} className="bg-green-600 p-5px flex flex-col gap-2">
                        <p className="text-lg">Ranking: {user.ranking}</p>
                        <h1 className="text-2xl font-bold">{user.name}</h1>
                        <p className="text-lg">Chave: {user.chave}</p>
                    </div>
                ))}
        </div>
    );
}