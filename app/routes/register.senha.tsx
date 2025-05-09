import Input from "./components/Input";
import { useUserRegister } from "~/data/context/ContextUserRegister";
import { useNavigate } from "@remix-run/react";

export default function RegisterSenha() {
  const navigate = useNavigate();
  const userRegister = useUserRegister(); // Obtém o objeto completo do contexto
  const { setPassword, password, name, email, image } = userRegister; // Desestrutura as propriedades necessárias

  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value); // Atualiza o estado da senha
  };

  const handleRegister = async () => {
    try {
      // Cria um objeto FormData para enviar os dados como multipart/form-data
      const formData = new FormData();
      formData.append("Name", name);
      formData.append("Email", email);
      formData.append("Password", password);

      if (image) {
        formData.append("Image", image); // Adiciona a imagem ao FormData
      }

      const response = await fetch("http://localhost:5042/api/Users", {
        method: "POST",
        body: formData, // Envia os dados como FormData
      });

      if (!response.ok) {
        throw new Error("Erro ao cadastrar usuário");
      }

      console.log("Usuário cadastrado com sucesso");
      navigate("/main/ranking"); // Redireciona para a página de ranking
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error);
    }
  };

  const handleNavigate = () => {
    handleRegister(); // Chama a função de registro
    console.log("Dados do registro de usuário:", userRegister); // Exibe os dados no console
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