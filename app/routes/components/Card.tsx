import React, { useState, useEffect } from "react";

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
  jogoId: number | string;
  relator?: string | number | null;
  jog1_G1?: number;
  jog1_G2?: number;
  jog2_G1?: number;
  jog2_G2?: number;
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
  relator,
  jog1_G1,
  jog1_G2,
  jog2_G1,
  jog2_G2,
}: CardProps) {
  const [expandido, setExpandido] = useState(false);
  const [inputs, setInputs] = useState([0, 0, 0, 0]);
  const [imgFile, setImgFile] = useState<File | null>(null);

  const ehJogador =
    String(currentUserId) === String(id_jogador_1) ||
    String(currentUserId) === String(id_jogador_2);

  const ehRelator = String(currentUserId) === String(relator);
  const podeLancarResultado = ehJogador && status === "Agendado";
  const podeConfirmarResultado = ehJogador && !ehRelator && status === "Resultado";

  // Ao expandir para lançar, inicializa os inputs com os valores vindos do jogo (se existirem)
  useEffect(() => {
    if (expandido && podeLancarResultado) {
      setInputs([
        typeof jog1_G1 === "number" ? jog1_G1 : 0,
        typeof jog1_G2 === "number" ? jog1_G2 : 0,
        typeof jog2_G1 === "number" ? jog2_G1 : 0,
        typeof jog2_G2 === "number" ? jog2_G2 : 0,
      ]);
    }
  }, [expandido, podeLancarResultado, jog1_G1, jog1_G2, jog2_G1, jog2_G2]);

  useEffect(() => {
    if (podeConfirmarResultado) {
      setExpandido(true);
    }
    // eslint-disable-next-line
  }, [podeConfirmarResultado]);

  const handleChange = (idx: number, value: string) => {
    const novoArray = [...inputs];
    novoArray[idx] = Number(value);
    setInputs(novoArray);
  };

const handleConfirmarResultado = async () => {
  try {
    const payload = { Status: "Finalizado" };
    const response = await fetch(`http://localhost:5042/api/Jogos/${jogoId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      const errorText = await response.text();
      alert("Erro ao confirmar o resultado: " + errorText);
      return;
    }
    // Recarrega
    window.location.reload();
  } catch (error) {
    alert("Erro ao tentar confirmar o resultado!");
  }
};

const handleLancarResultado = async () => {
  try {
    let imgBase64: string | null = null;

    if (imgFile) {
      imgBase64 = await new Promise<string | null>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          const result = reader.result as string;
          const base64 = result.split(",")[1] || result;
          resolve(base64);
        };
        reader.onerror = reject;
        reader.readAsDataURL(imgFile);
      });
    }

    const payload: any = {
      Jog1_G1: inputs[0],
      Jog1_G2: inputs[1],
      Jog2_G1: inputs[2],
      Jog2_G2: inputs[3],
      Status: "Resultado",
      Relator: String(currentUserId),
    };
    if (imgBase64) payload.Img = imgBase64;

    const response = await fetch(`http://localhost:5042/api/Jogos/${jogoId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      alert("Erro ao salvar o resultado no servidor: " + errorText);
      return;
    }

    // Recarrega
    window.location.reload();
  } catch (err) {
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
          <img src={imagem_J1 || "/userPlaceholder.jpg"} alt={jogador_1} className="w-24 h-24 object-cover rounded-full shadow-lg" />
          <span className="h3-center text-center">{jogador_1}</span>
        </div>
        <div className="text-3xl font-bold text-black self-center">X</div>
        <div className="flex flex-col items-center">
          <img src={imagem_J2 || "/userPlaceholder.jpg"} alt={jogador_2} className="w-24 h-24 object-cover rounded-full shadow-lg" />
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

      {/* Confirmação de resultado */}
      {podeConfirmarResultado && expandido && (
        <div className="flex flex-col items-center mt-4 gap-2">
          <div className="text-black font-semibold mb-2">Resultado lançado:</div>
          <div className="text-black">{jogador_1}: {jog1_G1 ?? 0} - {jog1_G2 ?? 0}</div>
          <div className="text-black">{jogador_2}: {jog2_G1 ?? 0} - {jog2_G2 ?? 0}</div>
          <button
            onClick={handleConfirmarResultado}
            className="mt-2 px-4 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
          >
            Confirmar resultado
          </button>
        </div>
      )}

      {/* Lançar resultado */}
      {!podeConfirmarResultado && podeLancarResultado && (
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
              <input
                type="file"
                accept="image/*"
                onChange={e => {
                  if (e.target.files && e.target.files[0]) {
                    setImgFile(e.target.files[0]);
                  } else {
                    setImgFile(null);
                  }
                }}
              />
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