import userList from "~/data/users";

export default function Ranking() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-verde1-claro p-6">
      <h1 className="text-3xl font-bold text-verde1-escuro mb-8">Ranking</h1>
      <div className="grid grid-cols-1 gap-6 w-full max-w-5xl">
        {userList.map((user) => (
          <div
            key={user.name}
            className="bg-verde1-escuro shadow-lg gap-2 flex flex-row justify-between rounded-lg p-6 text-white hover:scale-105 transform transition duration-300"
          >
            <h2 className="text-2xl font-montserrat mb-2">{user.ranking}</h2>
            <h2 className="text-2xl font-montserrat mb-2">{user.name}</h2>
            <h2 className="text-2xl font-montserrat mb-2">{user.chave}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}