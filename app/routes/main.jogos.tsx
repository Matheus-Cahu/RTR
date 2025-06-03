import React from "react";
import Card from "./components/Card";
import CardFinalizados from "./components/CardFinalizados";
import { json } from "@remix-run/node";
import { useLoaderData, useFetcher } from "@remix-run/react";
import { getSession } from "../session.server";
import SolicitacaoJogo from "./components/solicitacaoJogo";
import { CalendarX } from "lucide-react";

export const loader = async ({ request }) => {
  const session = await getSession(request);
  const currentUser = session.get("currentUser");
  const token = session.get("token");

  try {
    const [userResponse, jogosResponse] = await Promise.all([
      fetch("http://localhost:5042/api/Users", {
        headers: { Authorization: `Bearer ${token}` },
      }),
      fetch("http://localhost:5042/api/Jogos", {
        headers: { Authorization: `Bearer ${token}` },
      }),
    ]);

    if (!userResponse.ok || !jogosResponse.ok) {
      return json({ userList: [], jogosList: [], currentUser: null });
    }

    const [userList, jogosList] = await Promise.all([
      userResponse.json(),
      jogosResponse.json(),
    ]);

    return json({ userList, jogosList, currentUser });
  } catch (err) {
    return json({ userList: [], jogosList: [], currentUser: null });
  }
};

export const action = async ({ request }) => {
  const session = await getSession(request);
  const token = session.get("token");
  const formData = await request.formData();
  const jogoId = formData.get("jogoId");
  const actionType = formData.get("actionType");

  try {
    if (actionType === "aceitar") {
      const payload = { status: "Agendado" };
      const response = await fetch(
        `http://localhost:5042/api/Jogos/${jogoId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        return json({ success: false, error: errorText });
      }
      return json({ success: true });
    }

    if (actionType === "negar") {
      const response = await fetch(
        `http://localhost:5042/api/Jogos/${jogoId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        return json({ success: false, error: errorText });
      }
      return json({ success: true });
    }
  } catch (err) {
    return json({ success: false, error: err.message });
  }

  return json({ success: false, error: "Ação desconhecida" });
};

export default function Jogos() {
  const fetcher = useFetcher();
  const data = useLoaderData() || {};
  const { userList = [], jogosList = [], currentUser = null } = data;

  function handleAceitar(jogoId) {
    fetcher.submit({ jogoId, actionType: "aceitar" }, { method: "post" }).then(() => {
      window.location.reload();
    });
  }

  function handleNegar(jogoId) {
    fetcher.submit({ jogoId, actionType: "negar" }, { method: "post" }).then(() => {
      window.location.reload();
    });
  }

  const getUserById = (id) => {
    if(!id) return null;

    const idString = String(id);

    const user = userList.find((user) => {
      return String(user.id) === idString ||
        String(user.ID) === idString ||
        String(user.id) === idString;
    });

    if(!user){
      console.log(`Usuário com ID ${id} não encontrado na lista de ${userList.length} usuários`);
      console.log("Primieros 3 usuários na lista:", userList.slice(0, 3));
    }
    return user;
  };

  const jogosMarcadosOuResultado = jogosList.filter(
    (jogo) => jogo.status === "Agendado" || jogo.status === "Resultado"
  );
  const jogosFinalizados = jogosList.filter(
    (jogo) => jogo.status === "Finalizado"
  );

  function NenhumJogo({ texto }) {
    return (
      <div className="flex flex-col items-center justify-center w-full py-12 text-gray-600">
        <CalendarX size={48} className="mb-3 text-gray-400" />
        <span className="text-lg font-medium">{texto}</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 mb-6 p-6">
      {jogosList
        .filter(
          (jogo) =>
            jogo.status === "Solicitado" &&
            currentUser &&
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
      {jogosMarcadosOuResultado.length === 0 ? (
        <NenhumJogo texto="Nenhum jogo marcado ou aguardando confirmação." />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
          {jogosMarcadosOuResultado.map((jogo, index) => {
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
                currentUserId={currentUser?.id}
                id_jogador_1={jogo.jogador1}
                id_jogador_2={jogo.jogador2}
                relator={jogo.relator}
                jog1_G1={jogo.jog1_G1}
                jog1_G2={jogo.jog1_G2}
                jog2_G1={jogo.jog2_G1}
                jog2_G2={jogo.jog2_G2}
              />
            );
          })}
        </div>
      )}

      <h1 className="text-3xl font-bold text-gray-800 mt-6 mb-6">Jogos Finalizados</h1>
      {jogosFinalizados.length === 0 ? (
        <NenhumJogo texto="Nenhum jogo finalizado no momento." />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
          {jogosFinalizados.map((jogo, index) => {
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
                relator={jogo.relator}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
