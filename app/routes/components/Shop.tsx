import React from 'react';

interface Item {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

// Dados de exemplo dos itens da loja (você buscaria isso de uma API ou arquivo)
const storeItems: Item[] = [
  {
    id: 1,
    name: 'Camiseta Confortável',
    description: 'Uma camiseta macia e respirável para o dia a dia.',
    price: 25.99,
    image: '/images/camiseta.jpg', // Certifique-se de ter esta imagem na pasta public
  },
  {
    id: 2,
    name: 'Calça Jeans Clássica',
    description: 'Um par de jeans durável e com ótimo caimento.',
    price: 59.50,
    image: '/images/jeans.jpg', // Certifique-se de ter esta imagem na pasta public
  },
  {
    id: 3,
    name: 'Tênis Esportivo',
    description: 'Tênis ideal para corrida e atividades físicas.',
    price: 89.99,
    image: '/images/tenis.jpg', // Certifique-se de ter esta imagem na pasta public
  },
  {
    id: 4,
    name: 'Boné Casual',
    description: 'Um boné estiloso para complementar seu visual.',
    price: 19.99,
    image: '/images/bone.jpg', // Certifique-se de ter esta imagem na pasta public
  },
  {
    id: 5,
    name: 'Mochila Resistente',
    description: 'Mochila com compartimentos espaçosos para todas as suas necessidades.',
    price: 45.00,
    image: '/images/mochila.jpg', // Certifique-se de ter esta imagem na pasta public
  },
  {
    id: 6,
    name: 'Óculos de Sol Moderno',
    description: 'Óculos de sol com proteção UV e design elegante.',
    price: 39.99,
    image: '/images/oculos.jpg', // Certifique-se de ter esta imagem na pasta public
  },
];

const ItemCard: React.FC<{ item: Item }> = ({ item }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img src={item.image} alt={item.name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
        <p className="text-sm text-gray-600 mt-2">{item.description.substring(0, 60)}...</p>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-gray-700 font-bold">${item.price.toFixed(2)}</span>
          <button className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md text-sm">
            Adicionar ao Carrinho
          </button>
        </div>
      </div>
    </div>
  );
};

export default function Shop() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Nossa Loja</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {storeItems.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}