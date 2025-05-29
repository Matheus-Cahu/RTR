import { useState, useEffect } from "react";
import { ArrowDown, ArrowUp } from "lucide-react";
import { useFetcher } from "@remix-run/react";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  priceId: string; // <-- importante!
  tamanho?: string[];
  cor?: string[];
}

interface ShopCardProps {
  produto: Product;
  userId: string;
}

export default function ShopCard({ produto, userId }: ShopCardProps) {
  const fetcher = useFetcher();
  const [expanded, setExpanded] = useState(false);
  const [selectedQuantidade, setSelectedQuantidade] = useState(0);
  const [selectedTamanho, setSelectedTamanho] = useState("");
  const [selectedCor, setSelectedCor] = useState("");

  useEffect(() => {
    if (fetcher.data?.url) {
      window.location.href = fetcher.data.url;
    }
  }, [fetcher.data]);

  const handleToggle = () => setExpanded((prev) => !prev);

  return (
    <div className="flex justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden w-full max-w-xs transition transform hover:scale-105 duration-300">
        <img
          src={produto.imageUrl}
          alt={produto.name}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h2 className="text-lg font-bold text-gray-800 mb-1">
            {produto.name}
          </h2>
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
              {expanded ? (
                <ArrowUp className="w-4 h-4 inline-block ml-1" />
              ) : (
                <ArrowDown className="w-4 h-4 inline-block ml-1" />
              )}
            </button>
          </div>

          {expanded && (
            <div className="space-y-3 mt-4">
              <fetcher.Form method="post" action="/create-checkout-session">
                <input type="hidden" name="name" value={produto.name} />
                <input type="hidden" name="description" value={produto.description} />
                <input type="hidden" name="imageUrl" value={produto.imageUrl} />
                <input type="hidden" name="price" value={produto.price} />
                <input type="hidden" name="userId" value={userId} />
                <input type="hidden" name="priceId" value={produto.priceId} />

                <label className="block text-sm font-medium text-gray-700">
                  Quantidade
                </label>
                <input
                  type="number"
                  min={1}
                  name="quantidade"
                  value={selectedQuantidade}
                  onChange={e => setSelectedQuantidade(Number(e.target.value))}
                  required
                  disabled={fetcher.state === "submitting"}
                  className="w-full p-2 border border-gray-300 rounded"
                />

                {produto.tamanho && (
                  <>
                    <label className="block text-sm font-medium text-gray-700">
                      Tamanho
                    </label>
                    <select
                      name="tamanho"
                      value={selectedTamanho}
                      onChange={e => setSelectedTamanho(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded"
                      disabled={fetcher.state === "submitting"}
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

                {produto.cor && (
                  <>
                    <label className="block text-sm font-medium text-gray-700">
                      Cor
                    </label>
                    <select
                      name="cor"
                      value={selectedCor}
                      onChange={e => setSelectedCor(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded"
                      disabled={fetcher.state === "submitting"}
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

                <button
                  type="submit"
                  className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition mt-3"
                  disabled={fetcher.state === "submitting" || selectedQuantidade < 1}
                >
                  {fetcher.state === "submitting"
                    ? "Redirecionando..."
                    : "Adicionar ao Carrinho"}
                </button>
                {fetcher.data?.error && (
                  <p className="text-red-500">{fetcher.data.error}</p>
                )}
              </fetcher.Form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
