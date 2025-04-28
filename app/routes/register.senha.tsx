import Input from "./components/Input";
import { useUserRegister } from "~/data/context/ContextUserRegister";
import { useNavigate } from "@remix-run/react";

export default function RegisterSenha() {
  const navigate = useNavigate();
  const userRegister = useUserRegister(); // Obtém o objeto completo do contexto
  const { setPassword, password } = userRegister; // Desestrutura as propriedades necessárias

  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value); // Atualiza o estado da senha
  };

  const handleNavigate = () => {
    console.log("Dados do registro de usuário:", userRegister); // Exibe os dados no console
    navigate("/main/ranking"); // Redireciona para a página de ranking
  };

  return (
    <div className="flex flex-col items-center gap-4 justify-center h-screen bg-cover bg-center bg-white">
      <h1 className="h1" style={{ color: "black" }}>Insira e confirme sua senha para continuar</h1>
      <Input
        label="Senha"
        placeholder="Insira sua senha"
        onChange={handleChangePassword} // Atualiza a senha
      />
      <Input
        label="Confirme sua senha"
        placeholder="Confirme sua senha"
        onChange={handleChangePassword} // Pode ser ajustado para um estado separado, se necessário
      />
      <button
        type="button"
        onClick={handleNavigate} // Usa o navigate para redirecionar
        className="w-3/4 max-w-xs bg-green-600 text-white text-lg font-bold py-3 rounded-md hover:bg-green-700 transition"
      >
        Cadastrar
      </button>
    </div>
  );
}