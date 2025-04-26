import Card from "./components/Card";
import jogos from "~/data/jogos";
import CardFinalizados from "./components/CardFinalizados";
import { Circle, CircleCheck, CircleX } from "lucide-react";

export default function Jogos() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 mb-6 p-6">
        <div className="bg-azul-claro w-full max-w-5xl p-4 rounded-lg mb-6 justify-center text-center">
            <h1 className="h1 text-azul-escuro">Fulano está te chamando pra jogar no dia às em </h1>
            <div className="flex flex-row justify-center items-center mt-4">
            <div className="bg-verde1 rounded-full w-10 h-10 flex items-center justify-center mx-auto mt-4">        
            <CircleCheck className="text-white w-8 h-8" />
            </div>
            <div className="bg-vermelho rounded-full w-10 h-10 flex items-center justify-center mx-auto mt-4">        
            <CircleX className="text-white w-8 h-8" />
            </div>
            </div>
        
        </div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Jogos Marcados</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
        {jogos.filter((jogo) => (jogo.status == "Agendado")).map((jogo, index) => (
          <Card key={index} jogo={jogo} />
        ))}
      </div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Jogos Finalizados</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
        {jogos.filter((jogo) => (jogo.status == "Finalizado")).map((jogo, index) => (
          <CardFinalizados key={index} jogo={jogo} />
        ))}
      </div>
    </div>
  );
}