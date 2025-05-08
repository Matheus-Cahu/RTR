import Card from "./components/Card";
import jogos from "~/data/jogos";
import CardFinalizados from "./components/CardFinalizados";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getSession } from "../session.server"; 
import SolicitacaoJogo from "./components/solicitacaoJogo";

export const loader = async ({ request }) => {
  const session = await getSession(request);
  const currentUser = session.get("currentUser");
  const token = session.get("token");

  // Envia os dois fetch em paralelo
  const [userResponse, jogosResponse] = await Promise.all([
    fetch("http://localhost:5042/api/Users", {
      headers: { Authorization: `Bearer ${token}` }
    }),
    fetch("http://localhost:5042/api/Jogos", {
      headers: { Authorization: `Bearer ${token}` }
    })
  ]);

  if (!userResponse.ok || !jogosResponse.ok) {
    throw new Response("Erro ao buscar dados da API", { status: 500 });
  }

  const [userList, jogosList] = await Promise.all([
    userResponse.json(),
    jogosResponse.json(),
  ]);

  // Envie tudo em um objeto, como quiser
  return json({ userList, jogosList, currentUser });
};

export default function Jogos() {
  const { userList, jogosList, currentUser } = useLoaderData();
  console.log(jogosList);
  console.log("Current User: ", currentUser.id.toString());
  console.log(jogosList.filter((jogo) => (jogo.status == "Solicitado" && jogo.jogador2 == currentUser.id.toString())));

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 mb-6 p-6">
      {jogosList.filter((jogo) => (jogo.status == "Solicitado" && jogo.jogador2 == currentUser.id.toString())).map((jogo) => (SolicitacaoJogo({ jogador: userList.find((user) => user.id == jogo.jogador1).name, data: jogo.data, local: jogo.local })))}
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Jogos Marcados</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
        {jogosList.filter((jogo) => (jogo.status == "Agendado")).map((jogo, index) => (
          <Card key={index} jogo={jogo} />
        ))}
      </div>
      <h1 className="text-3xl font-bold text-gray-800 mt-6 mb-6">Jogos Finalizados</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
        {jogosList.filter((jogo) => (jogo.status == "Finalizado")).map((jogo, index) => (
          <CardFinalizados key={index} jogo={jogo} />
        ))}
      </div>
    </div>
  );
}