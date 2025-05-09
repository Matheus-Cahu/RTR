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
  return json({ success: false, error: "Ação desconhecida" });
};

// COMPONENTE PRINCIPAL
export default function Jogos() {
  const fetcher = useFetcher();
  const { userList, jogosList, currentUser } = useLoaderData();

  function handleAceitar(jogoId) {
    fetcher.submit({ jogoId, actionType: "aceitar" }, { method: "post" });
  }

  function handleNegar(jogoId) {
    fetcher.submit({ jogoId, actionType: "negar" }, { method: "post" });
  }

  // Função para buscar usuário por ID
  const getUserById = (id) => userList.find((user) => user.id == id || user.ID == id);

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
            jogador={getUserById(jogo.jogador1)?.name ?? "Jogador 1"}
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
            const jogador1User = getUserById(jogo.jogador1);
            const jogador2User = getUserById(jogo.jogador2);

            return (
              <Card
                key={jogo.id ?? index}
                jogador_1={jogador1User?.name ?? jogo.jogador1}
                jogador_2={jogador2User?.name ?? jogo.jogador2}
                imagem_J1={jogador1User?.imgBase64}
                imagem_J2={jogador2User?.imgBase64}
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
          .map((jogo, index) => {
            console.log(jogo);
            const jogador1User = getUserById(jogo.jogador1);
            const jogador2User = getUserById(jogo.jogador2);
            return (
              <CardFinalizados
                key={jogo.id ?? index}
                jogador_1={jogador1User?.name ?? jogo.jogador1}
                jogador_2={jogador2User?.name ?? jogo.jogador2}
                imagem={jogo.img}
                jog1_g_1={jogo.jog1_G1}
                jog1_g_2={jogo.jog1_G2}
                jog2_g_1={jogo.jog2_G1}
                jog2_g_2={jogo.jog2_G2}
                data={jogo.data}
                local={jogo.local}
              />
            );
          })}
      </div>
    </div>
  );
}