import { Info, Link } from "lucide-react";
import Ranking from "./components/Ranking";

export default function ranking(){
    return(
        <div>
            <h1 className="h1-center mb-6">Ranking</h1> 
            <h2 className="h2-center mb-6">Seja bem vindo, User</h2>
            <div className="flex flex-row justify-between m-2 items-center">
            <a href="/main/marcar_jogo">
            <button className="btn-azul mb-2">Marcar Jogo</button>
            </a>
            <a href="/main/rules">
            <Info className="text-black w-8 h-8"/>
            </a>
            </div>
            <Ranking />
        </div>
    )
}