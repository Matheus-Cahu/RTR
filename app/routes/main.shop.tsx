import ShopCard from "./components/ShopCard";
import { useLoaderData } from "@remix-run/react";
import { loader } from "./main.jogos";
import { getSession } from "../session.server";
import { json } from "@remix-run/node";

export const loader = async ({ request }) => {
  const session = await getSession(request);
  const currentUser = session.get("currentUser");
  const token = session.get("token");

  // Busca lista de usuários da API (se exigir autenticação, envie o token)
  const response = await fetch("http://localhost:5042/api/Produto", {
    headers: { Authorization: `Bearer ${token}` }
  });

  if (!response.ok) {
    throw new Response("Erro ao buscar os dados da API", { status: 500 });
  }

  const productList = await response.json();

  // Envia ambos para o front
  return json({ productList, currentUser });
};

export default function MainShop() {
  const {productList, currentUser} = useLoaderData();
  console.log(productList)
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="h1-center">Loja</h1>
      <h2 className="h2-center">Explore nossos produtos</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {productList.map((produto) => (
          <ShopCard key={produto.id} produto={produto} />
        ))}
      </div>
    </div>
  );
}
