export default function Card() {
  return (
    <div className="max-w-sm mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6 space-y-4">
      
      {/* Título */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-slate-800">Evento Especial</h2>
      </div>

      {/* Imagens com versus */}
      <div className="flex justify-center items-center space-x-6">
        {/* Primeira imagem */}
        <div className="flex flex-col items-center">
          <img
            src="/caminho-da-sua-imagem-1.jpg"  // <-- Coloque aqui o caminho da primeira imagem
            alt="Participante 1"
            className="w-24 h-24 object-cover rounded-full shadow-lg"
          />
          <span className="text-sm mt-2 text-slate-600">Time A</span>
        </div>
        
        {/* X (versus) */}
        <div className="text-3xl font-bold text-black">X</div>
        
        {/* Segunda imagem */}
        <div className="flex flex-col items-center">
          <img
            src="/caminho-da-sua-imagem-2.jpg"  // <-- Coloque aqui o caminho da segunda imagem
            alt="Participante 2"
            className="w-24 h-24 object-cover rounded-full shadow-lg"
          />
          <span className="text-sm mt-2 text-slate-600">Time B</span>
        </div>
      </div>

      {/* Informações */}
      <div className="flex items-center justify-around text-slate-600">
        <div className="text-center">
          <p className="text-sm font-semibold">Data</p>
          <p>25/04/2025</p>
        </div>

        <div className="text-center">
          <p className="text-sm font-semibold">Hora</p>
          <p>19:30</p>
        </div>

        <div className="text-center">
          <p className="text-sm font-semibold">Local</p>
          <p>Quadra Central</p>
        </div>
      </div>
    </div>
  );
}