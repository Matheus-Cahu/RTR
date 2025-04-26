import Input from "./components/Input"

export default function email(){
    return(
        <div className="flex flex-col items-center gap-4 justify-center h-screen bg-cover bg-center bg-white">
          <h1 className="title" style={{ color: 'black' }}>Insira seu email para continuar</h1>  
          <Input></Input>
          <button className="w-3/4 max-w-xs bg-green-600 text-white text-lg font-bold py-3 rounded-md hover:bg-green-700 transition">
        ENTRAR
      </button>
        </div>
    )
    
}