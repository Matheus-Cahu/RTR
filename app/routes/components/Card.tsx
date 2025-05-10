import React, { useState } from "react";

interface CardProps {
  jogador_1: string;
  jogador_2: string;
  imagem_J1: string;
  imagem_J2: string;
  data: string;
  local: string;
  id_jogador_1: number | string;
  id_jogador_2: number | string;
  currentUserId: number | string;
  status: string;
  jogoId: number | string; // ID do jogo para realizar o update
}

export default function Card({
  jogador_1,
  jogador_2,
  imagem_J1,
  imagem_J2,
  data,
  local,
  id_jogador_1,
  id_jogador_2,
  currentUserId,
  status,
  jogoId,
}: CardProps) {
  const [expandido, setExpandido] = useState(false);
  const [inputs, setInputs] = useState([0, 0, 0, 0]);

  // Determinar se o usuário pode lançar resultado
  const ehJogador =
    String(currentUserId) === String(id_jogador_1) ||
    String(currentUserId) === String(id_jogador_2);
  const podeLancarResultado = ehJogador && status === "Agendado";

  const handleChange = (idx: number, value: string) => {
    const novoArray = [...inputs];
    novoArray[idx] = Number(value);
    setInputs(novoArray);
  };

  const handleLancarResultado = async () => {
    try {
      // Payload com dados do placar e novo status
      const payload = {
        Jog1_G1: inputs[0],
        Jog1_G2: inputs[1],
        Jog2_G1: inputs[2],
        Jog2_G2: inputs[3],
        Status: "Resultado", // Atualiza status
      };

      const response = await fetch(`http://localhost:5042/api/Jogos/${jogoId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`, // Token armazenado
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Erro ao lançar resultado:", errorText);
        alert("Erro ao salvar o resultado no servidor.");
        return;
      }

      alert("Resultado lançado com sucesso!");
      setExpandido(false);
    } catch (err) {
      console.error("Erro na integração:", err);
      alert("Erro ao tentar lançar o resultado.");
    }
  };

  return (
    <div className="max-w-sm mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6 space-y-4">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-slate-800">Partida</h2>
      </div>
      <div className="flex justify-center items-start space-x-6">
        <div className="flex flex-col items-center">
          <img
            src={imagem_J1 || "/userPlaceholder.jpg"}
            alt={jogador_1}
            className="w-24 h-24 object-cover rounded-full shadow-lg"
          />
          <span className="h3-center text-center">{jogador_1}</span>
        </div>
        <div className="text-3xl font-bold text-black self-center">X</div>
        <div className="flex flex-col items-center">
          <img
            src={imagem_J2 || "/userPlaceholder.jpg"}
            alt={jogador_2}
            className="w-24 h-24 object-cover rounded-full shadow-lg"
          />
          <span className="h3-center text-center">{jogador_2}</span>
        </div>
      </div>
      <div className="flex items-center justify-around text-slate-600">
        <div className="text-center">
          <p className="text-sm font-semibold">Data</p>
          <p>{data}</p>
        </div>
        <div className="text-center">
          <p className="text-sm font-semibold">Local</p>
          <p>{local}</p>
        </div>
      </div>
      {podeLancarResultado && (
        <div className="flex flex-col items-center mt-2">
          {!expandido ? (
            <button
              onClick={() => setExpandido(true)}
              className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              Lançar resultado
            </button>
          ) : (
            <div className="w-full flex flex-col items-center gap-2 mt-2">
              <div className="flex justify-center items-center gap-2 mb-1">
                <span className="w-24"></span>
                <span className="h3-center text-black">G1</span>
                <span className="h3-center text-black">G2</span>
              </div>
              <div className="flex justify-center items-center gap-2 mb-1">
                <span className="w-24 text-right font-medium truncate text-black">{jogador_1}</span>
                <input
                  type="number"
                  min={0}
                  value={inputs[0]}
                  onChange={e => handleChange(0, e.target.value)}
                  className="w-12 text-center border border-gray-300 rounded h-9"
                />
                <input
                  type="number"
                  min={0}
                  value={inputs[1]}
                  onChange={e => handleChange(1, e.target.value)}
                  className="w-12 text-center border border-gray-300 rounded h-9"
                />
              </div>
              <div className="flex justify-center items-center gap-2">
                <span className="w-24 text-right font-medium truncate text-black">{jogador_2}</span>
                <input
                  type="number"
                  min={0}
                  value={inputs[2]}
                  onChange={e => handleChange(2, e.target.value)}
                  className="w-12 text-center border border-gray-300 rounded h-9"
                />
                <input
                  type="number"
                  min={0}
                  value={inputs[3]}
                  onChange={e => handleChange(3, e.target.value)}
                  className="w-12 text-center border border-gray-300 rounded h-9"
                />
              </div>
              <button
                onClick={handleLancarResultado}
                className="mt-2 px-4 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
              >
                Lançar
              </button>
              <button
                onClick={() => setExpandido(false)}
                className="text-xs text-gray-600 mt-1 underline hover:text-red-500"
              >
                Cancelar
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}