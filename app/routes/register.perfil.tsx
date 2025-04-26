import Input from "./components/Input"
import InputPicture from "./components/InputPicture"

export default function email(){
    return(
        <div className="flex flex-col items-center gap-4 justify-center h-screen bg-cover bg-center bg-white">
          <h1 className="title" style={{ color: 'black' }}>Crie seu perfil UTR</h1>  
          <InputPicture></InputPicture>
          <Input label="Nome" placeholder="Insira seu nome completo"></Input>
          <button onClick={() => window.location.href = '/register/senha'} className="w-3/4 max-w-xs bg-green-600 text-white text-lg font-bold py-3 rounded-md hover:bg-green-700 transition">
        Prosseguir
      </button>
        </div>
    )
    
}