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

  useEffect(() => {
    if (expandido && podeLancarResultado) {
      setInputs([
        jog1_G1 ?? 0,
        jog1_G2 ?? 0,
        jog2_G1 ?? 0,
        jog2_G2 ?? 0,
      ]);
    }
  }, [expandido, podeLancarResultado, jog1_G1, jog1_G2, jog2_G1, jog2_G2]);

  useEffect(() => {
    if (podeConfirmarResultado) {
      setExpandido(true);
    }
  }, [podeConfirmarResultado]);

  const handleChange = (idx: number, value: string) => {
    const novoArray = [...inputs];
    novoArray[idx] = Number(value);
    setInputs(novoArray);
  };

  const atualizarVitoriasVencedor = async (vencedorId: number | string) => {
    try {
      console.log("Atualizando vitórias do vencedor:", vencedorId);
      const userRes = await fetch(`http://localhost:5042/api/Users/${vencedorId}`, {
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
      });

      if (userRes.ok) {
        const userData = await userRes.json();
        console.log("Dados do usuário antes da atualização:", userData);

        const novasVitorias = (userData.Vitorias ?? 0) + 1;
        userData.Vitorias = novasVitorias;

        const updateRes = await fetch(`http://localhost:5042/api/Users/${vencedorId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
          body: JSON.stringify(userData),
        });

        if (updateRes.ok) {
          console.log("Vitórias atualizadas com sucesso:", novasVitorias);
        } else {
          console.error("Erro ao atualizar vitórias:", await updateRes.text());
        }
      } else {
        console.error("Erro ao buscar usuário:", await userRes.text());
      }
    } catch (userErr) {
      console.error("Erro ao atualizar contagem de vitórias do vencedor.", userErr);
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

    const payload = {
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
      console.error("Erro ao salvar o resultado no servidor:", errorText);
      return;
    }

    // Determine o destinatário com base em quem lançou o resultado
    const destinatario = currentUserId === id_jogador_1 ? id_jogador_2 : id_jogador_1;
    console.log("Destinatário da notificação:", destinatario);
    console.log("Id current user:", currentUserId);
    const notificacaoPayload = {
      Titulo: "Resultado lançado",
      Conteudo: `Resultado da partida entre ${jogador_1} e ${jogador_2} foi lançado.`,
      Dest: String(destinatario),
      Seen: false,
      Tipo: "Resultado",
      Id_jogo: jogoId,
    };

    const responseNotificacao = await fetch("http://localhost:5042/api/Notificacoes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
      body: JSON.stringify(notificacaoPayload),
    });

    if (!responseNotificacao.ok) {
      const errorText = await responseNotificacao.text();
      console.error("Erro ao criar notificação:", errorText);
      return;
    }

    console.log("Resultado lançado com sucesso.");
  } catch (err) {
    console.error("Erro ao tentar lançar o resultado.", err);
  }
};

  const handleConfirmarResultado = async () => {
    try {
      const payload = { Status: "Finalizado" };
      console.log("Confirmando resultado com payload:", payload);
      const response = await fetch(`http://localhost:5042/api/Jogos/${jogoId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const pontosJogador1 = inputs[0] + inputs[1];
        const pontosJogador2 = inputs[2] + inputs[3];
        let vencedorId = null;
        if (pontosJogador1 > pontosJogador2) {
          vencedorId = id_jogador_1;
        } else if (pontosJogador2 > pontosJogador1) {
          vencedorId = id_jogador_2;
        }

        if (vencedorId) {
          await atualizarVitoriasVencedor(vencedorId);
        }

        window.location.reload();
      } else {
        const errorText = await response.text();
        console.error("Erro ao confirmar o resultado:", errorText);
      }
    } catch (error) {
      console.error("Erro ao tentar confirmar o resultado!", error);
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