interface SolicitacaoJogoProps {
    jogador: string;
    data: string;
    local: string;
}

export default function SolicitacaoJogo(SolicitacaoJogoProps: SolicitacaoJogoProps) {
    return (
        <div className="bg-azul-claro w-full max-w-5xl p-4 rounded-lg mb-6 justify-center text-center">
            <h1 className="h1 text-azul-escuro">{SolicitacaoJogoProps.jogador} deseja jogar com você no dia {SolicitacaoJogoProps.data} em {SolicitacaoJogoProps.local} </h1>
            <div className="flex flex-row justify-center items-center mt-4">
            <div className="bg-verde1 rounded-full w-10 h-10 flex items-center justify-center mx-auto mt-4">       
             <button className="btn-verde1">Aceitar</button>
            </div>
            <div className="bg-vermelho rounded-full w-10 h-10 flex items-center justify-center mx-auto mt-4">       
            <button className="btn-vermelho">Recusar</button>
            </div>
            </div>   
        </div>
    )
}