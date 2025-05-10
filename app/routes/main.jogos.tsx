import Card from "./components/Card";
import CardFinalizados from "./components/CardFinalizados";
import { json } from "@remix-run/node";
import { useLoaderData, useFetcher } from "@remix-run/react";
import { getSession } from "../session.server";
import SolicitacaoJogo from "./components/solicitacaoJogo";

// LOADER
export const loader = async ({ request }) => {
  const session = await getSession(request);
  const currentUser = session.get("currentUser");
  const token = session.get("token");

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

  return json({ userList, jogosList, currentUser });
};

// ACTION (Aceitar ou Negar)
export const action = async ({ request }) => {
  const session = await getSession(request);
  const token = session.get("token");
  const formData = await request.formData();
  const jogoId = formData.get("jogoId");
  const actionType = formData.get("actionType");

  if (actionType === "aceitar") {
    try {
      const payload = { status: "Agendado" };
      const response = await fetch(`http://localhost:5042/api/Jogos/${jogoId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        return json({ success: false, error: errorText });
      }
      return json({ success: true });
    } catch (err) {
      return json({ success: false, error: err.message });
    }
  }

  if (actionType === "negar") {
    try {
      const response = await fetch(`http://localhost:5042/api/Jogos/${jogoId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        return json({ success: false, error: errorText });
      }
      return json({ success: true });
    } catch (err) {
      return json({ success: false, error: err.message });
    }
  }
  if (actionType === "lancar")
  return json({ success: false, error: "Ação desconhecida" });
};

// COMPONENTE PRINCIPAL
export default function Jogos() {
  const fetcher = useFetcher();
  const { userList, jogosList, currentUser } = useLoaderData();
  console.log(userList);
  const user1 = userList.find((j) => j.id == 52);
  console.log(user1);
  function handleAceitar(jogoId) {
    fetcher.submit({ jogoId, actionType: "aceitar" }, { method: "post" });
  }

  function handleNegar(jogoId) {
    fetcher.submit({ jogoId, actionType: "negar" }, { method: "post" });
  }

  // **Garanta que o campo é ID (ou id) e Img (ou img) conforme o backend!**
  // Exemplo: user.ID, user.Img

  // Exemplo de verificação rápida dos campos:
  // console.log(userList[0], jogosList[0]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 mb-6 p-6">
      {/* Solicitações pendentes de aceite */}
      {jogosList
        .filter(
          (jogo) =>
            jogo.status === "Solicitado" &&
            String(jogo.jogador2) === String(currentUser.id)
        )
        .map((jogo) => (
          <SolicitacaoJogo
            key={jogo.id}
            jogador={userList.find((user) => user.ID == jogo.jogador1)?.name}
            data={jogo.data}
            local={jogo.local}
            onAceitar={() => handleAceitar(jogo.id)}
            onNegar={() => handleNegar(jogo.id)}
          />
        ))}

      <h1 className="text-3xl font-bold text-gray-800 mb-6">Jogos Marcados</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
        {jogosList
          .filter((jogo) => jogo.status === "Agendado" || jogo.status === "Resultado")
          .map((jogo, index) => {
            console.log(jogo.jogador1, jogo.jogador2)
            const jogador1User = userList.find((j) => j.id == jogo.jogador1);
            const jogador2User = userList.find((j) => j.id == jogo.jogador2);
            return (
              <Card
                key={jogo.id ?? index}
                jogador_1={jogador1User.name}
                jogador_2={jogador2User.name}
                imagem_J1={jogador1User.imgBase64}
                imagem_J2={jogador2User.imgBase64}
                data={jogo.data}
                local={jogo.local}
                status={jogo.status}
                jogoId={jogo.id}
              />
            );
          })}
      </div>

      <h1 className="text-3xl font-bold text-gray-800 mt-6 mb-6">Jogos Finalizados</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
      {jogosList
  .filter((jogo) => jogo.status === "Finalizado")
  .map((jogo, index) => (
    <CardFinalizados key={jogo.id ?? index} jogo={jogo} />
  ))}
      </div>
    </div>
  );
}