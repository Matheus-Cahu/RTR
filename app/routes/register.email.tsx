import Input from "./components/Input";
import { useUserRegister } from "~/data/context/ContextUserRegister";
import { useNavigate } from "@remix-run/react";

export default function Email() {
  const navigate = useNavigate();
  const userRegister = useUserRegister(); // Obtém o objeto completo do contexto
  const { setEmail, email } = userRegister; // Desestrutura as propriedades necessárias

  const handleNavigate = () => {
    console.log("Dados do registro de usuário:", userRegister); // Exibe o objeto completo no console
    navigate("/register/perfil");
  };

  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value); // Atualiza o estado do e-mail
  };

  return (
    <div className="flex flex-col items-center gap-4 justify-center h-screen bg-cover bg-center bg-white">
      <h1 className="h1" style={{ color: "black" }}>Insira seu email para continuar</h1>
      <Input
        label="Email"
        placeholder="Insira seu melhor email"
        onChange={handleChangeEmail} // Adiciona o evento onChange
      />
      <button
        onClick={handleNavigate}
        className="w-3/4 max-w-xs bg-green-600 text-white text-lg font-bold py-3 rounded-md hover:bg-green-700 transition"
      >
        Prosseguir
      </button>
    </div>
  );
}