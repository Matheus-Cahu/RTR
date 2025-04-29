import { Info, Link } from "lucide-react";
import Ranking from "./components/Ranking";
import { json, LoaderFunction } from "@remix-run/node"; // Apenas no loader
import { useLoaderData } from "@remix-run/react"; // Para o lado do cliente

export const loader: LoaderFunction = async () => {
    const response = await fetch("http://localhost:5042/api/Users", {
        method: "GET",
        headers: {
            "Accept": "application/json", // Indica que espera JSON como resposta
        },
    });

    if (!response.ok) {
        throw new Response("Erro ao buscar os dados", { status: response.status });
    }

    const data = await response.json();
    return json(data); // Retorna os dados como JSON
};

export default function ranking(){
    const userList = useLoaderData(); // Obtém os dados do loader
    console.log(userList);
    return(
        <div>
            <h1 className="h1-center mb-6">Ranking</h1> 
            <h2 className="h2-center mb-6">Seja bem vindo, User</h2>
            <div className="flex flex-row justify-between m-2 items-center">
            <a href="/main/marcar_jogo">
            <button className="btn-azul mb-2">Marcar Jogo</button>
            </a>
            <a href="/main/rules">
            <Info className="text-black w-8 h-8"/>
            </a>
            </div>
            <Ranking userList={userList}/>
        </div>
    )
}