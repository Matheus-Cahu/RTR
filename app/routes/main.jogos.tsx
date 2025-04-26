import Card from "./components/Card";
import jogos from "~/data/jogos";

export default function Jogos() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Jogos Marcados</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
        {jogos.filter((jogo) => (jogo.status == "Agendado")).map((jogo, index) => (
          <Card key={index} jogo={jogo} />
        ))}
      </div>
    </div>
  );
}