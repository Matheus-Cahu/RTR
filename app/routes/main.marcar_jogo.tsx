import Select from "./components/Select";
import Input from "./components/Input";
import { LoaderFunction } from "@remix-run/node";
import { json, useLoaderData } from "@remix-run/react";
import { getSession } from "../session.server";

export const loader: LoaderFunction = async ({request}) => {
    const session = await getSession(request);
    const currentUser = session.get("currentUser");
    const token = session.get("token");

    const response = await fetch("http://localhost:5042/api/Users", {
      headers: { Authorization: `Bearer ${token}` }
    });

    if (!response.ok) {
        throw new Response("Erro ao buscar os dados", { status: response.status });
    }

    const userList = await response.json();
    return json({ userList, currentUser }); // Retorna os dados como JSON
};

export default function marcar_jogo() {
  const {userList, currentUser} = useLoaderData(); // Obtém os dados do loader
  return (
    <div className="flex flex-col items-center justify-center ">
      <h1 className="h1 mb-4">Marcar Jogo</h1>
      <form className="flex flex-col gap-4">
      <select className="w-full bg-transparent border border-teal-700 rounded-md px-4 py-3 text-black placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-teal-700">
  {userList
    .filter(user => user.chave === 0 && user.id !== currentUser.id)
    .map(user => (
      <option key={user.id} value={user.id}>
        {user.name}
      </option>
    ))}
</select>
        <Input label="Local" placeholder="Local do jogo"></Input>
        {/* Data Picker */}
        <button className="btn-azul mb-2">
          Marcar Jogo
        </button>
      </form>
    </div>
  );
}