import Input from "./components/Input"

export default function email(){
    return(
        <div className="flex flex-col items-center gap-4 justify-center h-screen bg-cover bg-center bg-white">
          <h1 className="h1" style={{ color: 'black' }}>Insira e confirme sua senha para continuar</h1>  
          <Input label="Senha" placeholder="Insira sua senha"></Input>
          <Input label="Senha" placeholder="Confirme sua senha"></Input>
          <button 
            onClick={() => window.location.href = '/main/ranking'} 
            className="w-3/4 max-w-xs bg-green-600 text-white text-lg font-bold py-3 rounded-md hover:bg-green-700 transition"
          >
            Cadastrar
          </button>
        </div>
    )
    
}