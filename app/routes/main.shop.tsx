import ShopCard from "./components/ShopCard";

const produtos = [
  {
    id: 1,
    name: "Camisa Polo",
    description: "Camisa polo 100% algodão, ideal para o dia a dia.",
    price: 79.90,
    imageUrl: "https://via.placeholder.com/300x200?text=Camisa+Polo",
  },
  {
    id: 2,
    name: "Tênis Esportivo",
    description: "Confortável e resistente para suas atividades físicas.",
    price: 199.99,
    imageUrl: "https://via.placeholder.com/300x200?text=T%C3%AAnis+Esportivo",
  },
  {
    id: 3,
    name: "Relógio Digital",
    description: "Com cronômetro, alarme e resistente à água.",
    price: 149.50,
    imageUrl: "https://via.placeholder.com/300x200?text=Rel%C3%B3gio+Digital",
  },
  // Adicione mais produtos aqui
];

export default function MainShop() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-center mb-4 font-montserrat">Loja</h1>
      <h2 className="text-xl text-center mb-8 font-montserrat">Explore nossos produtos</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {produtos.map((produto) => (
          <ShopCard key={produto.id} produto={produto} />
        ))}
      </div>
    </div>
  );
}
