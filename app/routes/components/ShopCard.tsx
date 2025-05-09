import { useState } from "react";
import { ArrowDown, ArrowUp } from "lucide-react";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  tamanho?: string[];      // Array opcional de tamanhos
  cor?: string[];          // Array opcional de cores
  quantidade: number;      // Quantidade disponível
}

interface ShopCardProps {
  produto: Product;
}

export default function ShopCard({ produto }: ShopCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [selectedQuantidade, setSelectedQuantidade] = useState(1);
  const [selectedTamanho, setSelectedTamanho] = useState("");
  const [selectedCor, setSelectedCor] = useState("");

  const handleToggle = () => setExpanded((prev) => !prev);

  const handleAddToCart = () => {
    console.log({
      id: produto.id,
      nome: produto.name,
      quantidade: selectedQuantidade,
      tamanho: selectedTamanho,
      cor: selectedCor,
    });
    alert("Produto adicionado ao carrinho!");
  };

  return (
    <div className="flex justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden w-full max-w-xs transition transform hover:scale-105 duration-300">
        <img
          src={produto.imageUrl}
          alt={produto.name}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h2 className="text-lg font-bold text-gray-800 mb-1">{produto.name}</h2>
          <p className="text-sm text-gray-600 mb-3">{produto.description}</p>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xl font-semibold text-green-600">
              R$ {produto.price.toFixed(2)}
            </span>
            <button
              onClick={handleToggle}
              className="bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm px-4 py-2 rounded-full hover:brightness-110 focus:outline-none"
            >
              {expanded ? "Ver Menos" : "Ver Mais"}{" "}
              {expanded ? <ArrowUp className="w-4 h-4 inline-block ml-1" /> : <ArrowDown className="w-4 h-4 inline-block ml-1" />}
            </button>
          </div>

          {expanded && (
            <div className="space-y-3 mt-4">
              {/* Select de quantidade */}
              <label className="block text-sm font-medium text-gray-700">Quantidade</label>
              <select
                className="w-full p-2 border border-gray-300 rounded"
                value={selectedQuantidade}
                onChange={(e) => setSelectedQuantidade(parseInt(e.target.value))}
              >
                {Array.from({ length: produto.quantidade }, (_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>

              {/* Select de tamanho (se disponível) */}
              {produto.tamanho && (
                <>
                  <label className="block text-sm font-medium text-gray-700">Tamanho</label>
                  <select
                    className="w-full p-2 border border-gray-300 rounded"
                    value={selectedTamanho}
                    onChange={(e) => setSelectedTamanho(e.target.value)}
                  >
                    <option value="">Selecione</option>
                    {produto.tamanho.map((t, index) => (
                      <option key={index} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </>
              )}

              {/* Select de cor (se disponível) */}
              {produto.cor && (
                <>
                  <label className="block text-sm font-medium text-gray-700">Cor</label>
                  <select
                    className="w-full p-2 border border-gray-300 rounded"
                    value={selectedCor}
                    onChange={(e) => setSelectedCor(e.target.value)}
                  >
                    <option value="">Selecione</option>
                    {produto.cor.map((c, index) => (
                      <option key={index} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </>
              )}

              {/* Botão de adicionar ao carrinho */}
              <button
                onClick={handleAddToCart}
                className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition"
              >
                Adicionar ao Carrinho
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
