import { useState } from "react";

export default function Rules() {
  const [textoAtual, setTexto] = useState("");

  const textos = {
    matricula: `📌 Matrícula
Seja bem-vindo ao nosso Ranking!
Para começar a jogar, você precisa realizar sua matrícula diretamente aqui no app.
Preencha seus dados, efetue o pagamento da taxa de matrícula e pronto! Seu acesso será liberado assim que o pagamento for confirmado.`,

    ranking: `🏅 Ranking
O ranking é dividido em chaves de 3 atletas, organizadas de acordo com a classificação atual.
Cada mês representa uma rodada. Até o dia 20, os jogadores enfrentam os dois adversários da sua chave.
A classificação dentro da chave segue estes critérios:
- Número de vitórias
- Saldo de games
- Confronto direto

Após os jogos:
1º lugar sobe para a chave superior
2º lugar permanece na mesma chave
3º lugar desce para a chave inferior

Do dia 21 até o final do mês, é possível desafiar jogadores até duas chaves acima. O desafio vale troca direta de posição.
Se o desafiado não aceitar, perde 3 posições no ranking.`,

    jogos: `🎾 Jogos
Os jogos devem ser realizados até o dia 20 de cada mês.
Você receberá um e-mail com os dados da partida (nome do adversário, local e horário).

Fique atento:
- Tenista inadimplente não poderá agendar partidas.
- Quem não comparecer ao jogo leva WO.
- 2 WOs seguidos ou 4 no ano resultam em exclusão do ranking.

Entre os dias 21 e 30/31, aproveite para lançar desafios e tentar subir no ranking!`,

    loja: `🛍️ Loja
Aqui você encontra dois espaços:
- Produtos oficiais: camisetas e itens exclusivos do ranking.
- Mercado entre atletas: venda e compra de produtos de tênis como raquetes, roupas e acessórios.

Tudo em um só lugar, com pagamento feito diretamente pelo app.`,

    parceria: `🤝 Parcerias
Tenistas do nosso ranking têm vantagens exclusivas com empresas parceiras!
Acesse a aba de parcerias e confira todos os estabelecimentos com descontos e benefícios.
Apresente sua carteirinha digital e aproveite.`,
  };

  const categorias = [
    { chave: "matricula", label: "Matrícula" },
    { chave: "ranking", label: "Ranking" },
    { chave: "jogos", label: "Jogos" },
    { chave: "loja", label: "Loja" },
    { chave: "parceria", label: "Parceria" },
  ];

  return (
    <div className="space-y-4 p-6 bg-slate-200 rounded-lg shadow-md">
      {categorias.map((cat) => (
        <div key={cat.chave}>
          <div className="flex items-center bg-slate-400 rounded-md">
            <button
              onClick={() => setTexto(textoAtual === cat.chave ? "" : cat.chave)}
              className="flex-1 text-left p-2 text-white"
            >
              {cat.label}
            </button>
            <button
              onClick={() => setTexto(textoAtual === cat.chave ? "" : cat.chave)}
              className="p-2 text-white"
            >
              {textoAtual === cat.chave ? "˅" : ">"}
            </button>
          </div>
          {textoAtual === cat.chave && (
            <p className="mt-2 text-slate-800 bg-white p-4 rounded-md shadow whitespace-pre-line">
              {textos[cat.chave]}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
