interface RankingProps {
  userList: {
    ranking: number;
    name: string;
    chave: string;
    imgBase64?: string;
  }[];
}

export default function Ranking({ userList }: RankingProps) {
  const chaves = ['A', '', '', 'B', '', '', 'C', '', '', 'D', '', '', 'E', '', '', 'F', '', '', 'G', '', '', 'H', '', '', 'I', '', '', 'J', '', '', 'K', '', '', 'L', '', '', 'M', '', '', 'N', '', '', 'O', '', '', 'P', '', '', 'Q', '', '', 'R', '', '', 'S', '', '', 'T', '', '', 'U', '', '', 'V', '', '', 'W', '', '', 'X', '', '', 'Y', '', '', 'Z'];

  return (
    <div className="flex flex-col items-center justify-start w-full bg-verde1-claro p-6 rounded-lg mb-14">
      <div className="grid grid-cols-1 gap-6 w-full max-w-5xl">
        {Array.isArray(userList) &&
          userList
            .sort((a, b) => a.ranking - b.ranking)
            .map((user) => (
              <div
                key={user.ranking}
                className="bg-verde1 shadow-lg gap-8 flex flex-row justify-between rounded-lg p-4 text-white w-[100%] items-center"
              >
                <h2 className="text-2xl font-montserrat mb-2">{user.ranking}</h2>
                <h2 className="text-2xl font-montserrat mb-2">{user.name}</h2>
                {user.imgBase64 ? (
                  <img
                    src={user.imgBase64}
                    alt={`Imagem de ${user.name}`}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center">
                    <span className="text-sm text-gray-600">Sem imagem</span>
                  </div>
                )}
                <h2 className="text-2xl font-montserrat mb-2">{chaves[user.chave]}</h2>
              </div>
            ))}
      </div>
    </div>
  );
}