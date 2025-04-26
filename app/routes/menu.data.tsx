import userList from "~/data/users";

export default function data(){
    return (
        <div className="flex flex-row gap-4">
            {userList.map((user) => (
                <div key={user.ranking} className="bg-green-600 p-5px flex flex-col gap-2">
                    <p className="text-lg">Ranking: {user.ranking}</p>
                    <h1 className="text-2xl font-bold">{user.name}</h1>
                    <p className="text-lg">Chave: {user.chave}</p>
                </div>
            ))}
        </div>
    )
}