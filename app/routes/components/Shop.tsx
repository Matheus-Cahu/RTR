import React, { useState } from 'react';

interface Item {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

export default function Shop() {
  const [storeItems, setStoreItems] = useState<Item[]>([]);
  const [newItem, setNewItem] = useState<Item>({
    id: 0,
    name: '',
    description: '',
    price: 0,
    image: '',
  });

  const handleAddItem = () => {
    if (!newItem.name || !newItem.description || !newItem.price || !newItem.image) {
      alert('Preencha todos os campos!');
      return;
    }

    setStoreItems([...storeItems, { ...newItem, id: Date.now() }]);
    setNewItem({ id: 0, name: '', description: '', price: 0, image: '' });
  };

  return (
    <div className="p-6 space-y-2 ">
      <h1 className='text-black text-center font-montserrat text-2xl   -mt-48 flex  '>Insira o produto que deseja vender</h1>
      
      {/* Formulário de adicionar item */}
      <div className="space-y-4 bg-white p-6 rounded-lg shadow-md -mt-8">
        <h2 className="text-xl font-bold text-slate-800">Adicionar Produto</h2>
        
        <input
          type="text"
          placeholder="Nome do Produto"
          value={newItem.name}
          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
          className="w-full p-2 border rounded-md"
        />
        
        <input
          type="text"
          placeholder="Descrição"
          value={newItem.description}
          onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
          className="w-full p-2 border rounded-md"
        />
        
        <input
          type="number"
          placeholder="Preço"
          value={newItem.price}
          onChange={(e) => setNewItem({ ...newItem, price: parseFloat(e.target.value) })}
          className="w-full p-2 border rounded-md"
        />
        
        <input
          type="text"
          placeholder="URL da Imagem"
          value={newItem.image}
          onChange={(e) => setNewItem({ ...newItem, image: e.target.value })}
          className="w-full p-2 border rounded-md"
        />

        <button
          onClick={handleAddItem}
          className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md"
        >
          Adicionar Produto
        </button>
      </div>

      {/* Lista de produtos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {storeItems.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img src={item.image} alt={item.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
              <p className="text-sm text-gray-600 mt-2">{item.description}</p>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-gray-700 font-bold">${item.price.toFixed(2)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
