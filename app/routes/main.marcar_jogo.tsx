import React, { useState } from "react";
import { useLoaderData, json } from "@remix-run/react";
import { getSession } from "../session.server";
import Input from "./components/Input";

// Loader permanece igual
export const loader = async ({ request }) => {
  const session = await getSession(request);
  const currentUser = session.get("currentUser");
  const token = session.get("token");

  const response = await fetch("http://localhost:5042/api/Users", {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    throw new Response("Erro ao buscar os dados", { status: response.status });
  }

  const userList = await response.json();
  return json({ userList, currentUser });
};

export default function MarcarJogo() {
  const { userList, currentUser } = useLoaderData();

  // Estados para os campos do formulário
  const [selectedUserId, setSelectedUserId] = useState("");
  const [local, setLocal] = useState("");
  const [data, setData] = useState(""); // caso queira adicionar campo de data futuramente

  // Função de submit
  const handleMarcar = async (e) => {
    e.preventDefault(); // Previne comportamento padrão do submit
  
    try {
      // Formato ISO para o campo 'data'
      const horarioDefault = "T00:00:00Z"; // Define um horário padrão se não houver horário específico
      const fullData = `${data}${horarioDefault}`;
  
      const body = {
        jogador1: currentUser.id.toString(), // ID do jogador atual
        jogador2: selectedUserId, // ID do adversário selecionado
        local: local, // Local do jogo
        data: fullData, // Data no formato ISO (exemplo: 2024-07-04T14:00:00Z)
        status: "Pendente", // Status inicial do jogo
  
        // Campos com valores padrão
        imagem: null, // Pode ser enviado como null se o backend suportar
        jog1_G1: 0,
        jog1_G2: 0,
        jog2_G1: 0,
        jog2_G2: 0,
        vencedor: "", // Inicializa como string vazia
      };
  
      console.log("Body enviado:", body);
  
      const response = await fetch("http://localhost:5042/api/Jogos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Indica envio em formato JSON
        },
        body: JSON.stringify(body), // Converte o corpo para JSON
      });
  
      if (!response.ok) {
        const errorDetails = await response.json();
        console.error("Erro ao cadastrar jogo:", errorDetails);
        throw new Error(errorDetails.message || "Erro ao cadastrar jogo");
      }
  
      console.log("Jogo marcado com sucesso!");
      // Redirecione após sucesso
      navigate("/main/jogos");
    } catch (error) {
      console.error("Erro ao cadastrar jogo:", error);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="h1 mb-4">Marcar Jogo</h1>
      <form className="flex flex-col gap-4" onSubmit={handleMarcar}>
        <select
          value={selectedUserId}
          onChange={(e) => setSelectedUserId(e.target.value)}
          className="w-full bg-transparent border border-teal-700 rounded-md px-4 py-3 text-black placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-teal-700"
          required
        >
          <option value="" disabled>
            Selecione o adversário
          </option>
          {userList
            .filter(
              (user) => user.chave === 0 && user.id !== currentUser.id
            )
            .map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
        </select>

        <Input
          label="Local"
          placeholder="Local do jogo"
          value={local}
          onChange={(e) => setLocal(e.target.value)}
          required
        />
        <Input
          label="Data"
          placeholder="Data do jogo"
          value={data}
          onChange={(e) => setData(e.target.value)}
          type="date"
        />

        <button className="btn-azul mb-2" type="submit">
          Marcar Jogo
        </button>
      </form>
    </div>
  );
}