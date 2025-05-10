interface CardFinalizadosProps {
  jogador_1: string;      // nome do jogador 1
  jogador_2: string;      // nome do jogador 2
  imagem: string | null;  // imagem em base64? (verifique este campo no backend!)
  jog1_g_1: number;       // pontos jogador 1, set 1
  jog1_g_2: number;       // pontos jogador 1, set 2
  jog2_g_1: number;       // pontos jogador 2, set 1
  jog2_g_2: number;       // pontos jogador 2, set 2
  data: string;
  local: string;
}

export default function CardFinalizados({
  jogador_1, jogador_2, imagem, jog1_g_1, jog1_g_2, jog2_g_1, jog2_g_2, data, local,
}: CardFinalizadosProps) {
  // Se imagem vier binária/base64, adaptar aqui:
const imgSrc = imagem ? `data:image/jpeg;base64,${imagem}` : undefined;
  // Se não for imagem, pode omitir o tag <img/>

  return (
    <div className="max-w-sm mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6 space-y-4">
                {imgSrc && (
              <img
          src={imgSrc}
          alt={`Imagem do jogo entre ${jogador_1} e ${jogador_2}`}
          className="w-full h-56 object-cover rounded"
        />
              )}
      <div className="flex items-center justify-between">
        <h1 className="h2-center">{jogador_1}</h1>
        <span className="h2-center">vs</span>
        <h1 className="h2-center">{jogador_2}</h1>
      </div>
      <div className="flex items-center justify-around text-slate-600 mb-2">
        <div className="text-center">
          <p className="text-sm font-semibold">Data</p>
          <p>{data}</p>
        </div>
        <div className="text-center">
          <p className="text-sm font-semibold">Local</p>
          <p>{local}</p>
        </div>
      </div>

      {/* Sets detalhados */}
      <div className="flex flex-col text-center text-black mb-2">
        <span>
          <strong>Sets:</strong>
        </span>
        <span>
          {jogador_1}: {jog1_g_1} - {jog1_g_2}
        </span>
        <span>
          {jogador_2}: {jog2_g_1} - {jog2_g_2}
        </span>
      </div>
      {(jog1_g_1 + jog1_g_2 > jog2_g_1 + jog2_g_2) ? (<h1 className="h2-center">Vencedor: {jogador_1}</h1>):(<h1 className="h2-center">Vencedor: {jogador_2}</h1>)}
    </div>
  );
}