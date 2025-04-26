interface Jogo {
  jogador_1: string;
  jogador_2: string;
  imagem_J1: string;
  imagem_J2: string;
  data: string;
  horario: string;
  local: string;
}

interface CardProps {
  jogo: Jogo;
}

export default function Card({ jogo }: CardProps) {
  return (
    <div className="max-w-sm mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6 space-y-4">
      {/* Título */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-slate-800">Partida</h2>
      </div>

      {/* Imagens com versus */}
      <div className="flex justify-center items-center space-x-6">
        {/* Primeira imagem */}
        <div className="flex flex-col items-center">
          <img
            src={jogo.imagem_J1} // Imagem do jogador 1
            alt={jogo.jogador_1}
            className="w-24 h-24 object-cover rounded-full shadow-lg"
          />
          <span className="text-sm mt-2 text-slate-600">{jogo.jogador_1}</span>
        </div>

        {/* X (versus) */}
        <div className="text-3xl font-bold text-black">X</div>

        {/* Segunda imagem */}
        <div className="flex flex-col items-center">
          <img
            src={jogo.imagem_J2} // Imagem do jogador 2
            alt={jogo.jogador_2}
            className="w-24 h-24 object-cover rounded-full shadow-lg"
          />
          <span className="text-sm mt-2 text-slate-600">{jogo.jogador_2}</span>
        </div>
      </div>

      {/* Informações */}
      <div className="flex items-center justify-around text-slate-600">
        <div className="text-center">
          <p className="text-sm font-semibold">Data</p>
          <p>{jogo.data}</p>
        </div>

        <div className="text-center">
          <p className="text-sm font-semibold">Hora</p>
          <p>{jogo.horario}</p>
        </div>

        <div className="text-center">
          <p className="text-sm font-semibold">Local</p>
          <p>{jogo.local}</p>
        </div>
      </div>
    </div>
  );
}