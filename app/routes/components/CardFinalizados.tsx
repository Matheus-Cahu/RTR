interface Jogo {
  jogador_1: string;      // nome do jogador 1
  jogador_2: string;      // nome do jogador 2
  imagem_J1: string;      // foto do jogador 1 (base64 ou url)
  imagem_J2: string;      // foto do jogador 2
  imagem: string;         // imagem geral do jogo (não será usada)
  jog1_g_1: number;       // pontos jogador 1, set 1
  jog1_g_2: number;       // pontos jogador 1, set 2
  jog2_g_1: number;       // pontos jogador 2, set 1
  jog2_g_2: number;       // pontos jogador 2, set 2
  vencedor: string;
  data: string;
  horario: string;
  status: "Agendado" | "Finalizado" | "Solicitado";
  local: string;
}

interface CardFinalizadosProps {
  jogo: Jogo;
}

export default function CardFinalizados({ jogo }: CardFinalizadosProps) {
  const placar1 = jogo.jog1_g_1 + jogo.jog1_g_2;
  const placar2 = jogo.jog2_g_1 + jogo.jog2_g_2;

  return (
    <div className="max-w-sm mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6 space-y-4">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-slate-800">Finalizado</h2>
      </div>
      <div className="flex justify-center items-start space-x-6">
        <div className="flex flex-col items-center">
          <img
            src={jogo.imagem_J1 || "/userPlaceholder.jpg"}
            alt={jogo.jogador_1}
            className="w-24 h-24 object-cover rounded-full shadow-lg"
          />
          <span className="h3-center text-center">{jogo.jogador_1}</span>
          <span className="text-lg font-bold text-black mt-1">{placar1}</span>
        </div>

        <div className="text-3xl font-bold text-black self-center">X</div>

        <div className="flex flex-col items-center">
          <img
            src={jogo.imagem_J2 || "/userPlaceholder.jpg"}
            alt={jogo.jogador_2}
            className="w-24 h-24 object-cover rounded-full shadow-lg"
          />
          <span className="h3-center text-center">{jogo.jogador_2}</span>
          <span className="text-lg font-bold text-black mt-1">{placar2}</span>
        </div>
      </div>

      <div className="flex items-center justify-around text-slate-600 mb-2">
        <div className="text-center">
          <p className="text-sm font-semibold">Data</p>
          <p>{jogo.data}</p>
        </div>
        <div className="text-center">
          <p className="text-sm font-semibold">Local</p>
          <p>{jogo.local}</p>
        </div>
      </div>

      {/* Sets detalhados */}
      <div className="flex flex-col text-center text-black mb-2">
        <span>
          <strong>Sets:</strong>
        </span>
        <span>
          {jogo.jogador_1}: {jogo.jog1_g_1} - {jogo.jog1_g_2}
        </span>
        <span>
          {jogo.jogador_2}: {jogo.jog2_g_1} - {jogo.jog2_g_2}
        </span>
      </div>

      <div className="text-center font-semibold text-green-700">
        Vencedor: {jogo.vencedor}
      </div>
    </div>
  );
}