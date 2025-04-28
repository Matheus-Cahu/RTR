import Input from "./components/Input";
import InputPicture from "./components/InputPicture";
import { useUserRegister } from "~/data/context/ContextUserRegister";
import { useNavigate } from "@remix-run/react";

export default function Email() {
  const navigate = useNavigate();
  const userRegister = useUserRegister(); // Obtém o objeto completo do contexto
  const { setName, name } = userRegister; // Desestrutura as propriedades necessárias

  const handleNavigate = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault(); // Previne o comportamento padrão do botão
    console.log("Dados do registro de usuário:", userRegister); // Exibe o objeto completo no console
    navigate("/register/senha");
  };

  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value); // Atualiza o estado do nome
  };

  return (
    <div className="flex flex-col items-center gap-4 justify-center h-screen bg-cover bg-center bg-white">
      <h1 className="h1" style={{ color: "black" }}>Crie seu perfil UTR</h1>
      <InputPicture />
      <Input
        label="Nome"
        placeholder="Insira seu nome completo"
        onChange={handleChangeName}
      />
      <button
        type="button"
        onClick={handleNavigate}
        className="w-3/4 max-w-xs bg-green-600 text-white text-lg font-bold py-3 rounded-md hover:bg-green-700 transition"
      >
        Prosseguir
      </button>
    </div>
  );
}