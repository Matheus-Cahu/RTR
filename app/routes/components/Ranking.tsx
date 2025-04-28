interface RankingProps {
  userList: {
    ranking: number;
    name: string;
    chave: string;
  }[];
}

export default function Ranking({ userList }: RankingProps) {
  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen bg-verde1-claro p-6 rounded-lg mb-14">
      <div className="grid grid-cols-1 gap-6 w-full max-w-5xl">
        {Array.isArray(userList) &&
          userList
            .sort((a: { ranking: number }, b: { ranking: number }) => a.ranking - b.ranking)
            .map((user: { ranking: number; name: string; chave: string }) => (
              <div
                key={user.ranking}
                className="bg-verde1 shadow-lg gap-8 flex flex-row justify-between rounded-lg p-4 text-white w-[100%] items-center"
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