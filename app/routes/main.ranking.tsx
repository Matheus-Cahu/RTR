// app/routes/ranking.jsx (ou .tsx, se usar TypeScript)
import { Info } from "lucide-react";
import Ranking from "./components/Ranking";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getSession } from "../session.server"; // ajuste o caminho se necessário


export const loader = async ({ request }) => {
  const session = await getSession(request);
  const currentUser = session.get("currentUser");
  const token = session.get("token");

  // Busca lista de usuários da API (se exigir autenticação, envie o token)
  const response = await fetch("http://localhost:5042/api/Users", {
    headers: { Authorization: `Bearer ${token}` }
  });

  if (!response.ok) {
    throw new Response("Erro ao buscar os dados da API", { status: 500 });
  }

  const userList = await response.json();

  // Envia ambos para o front
  return json({ userList, currentUser });
};

export default function ranking(){
  const {userList, currentUser} = useLoaderData();

    console.log(userList);
    console.log("Current User: ",currentUser);
    return(
        <div>
            <h1 className="h1-center mb-6">Ranking</h1> 
            <h2 className="h2-center mb-6">Seja bem vindo, {currentUser?.name || "Usuário"}</h2>
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