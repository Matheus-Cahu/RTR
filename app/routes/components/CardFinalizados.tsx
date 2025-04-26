interface Jogo {
  jogador_1: string;
  jogador_2: string;
  imagem_J1: string;
  imagem_J2: string;
  imagem: string;
  jog1_g_1: number;
  jog1_g_2: number;
  jog2_g_1: number;
  jog2_g_2: number;
  vencedor: string;
  data: string;
  horario: string;
  status: "Agendado" | "Finalizado";
  local: string;
}

interface CardProps {
  jogo: Jogo;
}

export default function Card({ jogo }: CardProps) {
  return (
    <div className="max-w-sm mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6 space-y-4">
      <img src={jogo.imagem} alt={`Imagem do jogo entre ${jogo.jogador_1} e ${jogo.jogador_2}`} />

      {/* Informações */}
      <div className="flex flex-col items-center justify-around text-slate-600">
        <h2>{jogo.jogador_1} vs {jogo.jogador_2}</h2>
        <h2>{jogo.jog1_g_1} - {jogo.jog1_g_2}</h2>
        <h2>{jogo.jog2_g_1} - {jogo.jog2_g_2}</h2>
        <h2>Vencedor: {(jogo.jog1_g_1 + jogo.jog1_g_2 > jogo.jog2_g_1 + jogo.jog2_g_2) ? jogo.jogador_1 : jogo.jogador_2}</h2>
      </div>
    </div>
  );
}