import { useNavigate } from "@remix-run/react";
import Input from "./components/Input"; // Ajuste caminho conforme necessário
import { useUserLogin } from "~/data/context/ContextUserLogin";

export default function LoginEmail() {
  const navigate = useNavigate();
  const { email, setEmail } = useUserLogin(); // Traz o email e o setter do contexto

  // Handler dentro do componente
  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleNavigate = () => {
    console.log("Dados do login de usuário:", email);
    navigate("/login/senha");
  };

  return (
    <div className="flex flex-col items-center gap-4 justify-center h-screen bg-cover bg-center bg-white">
      <label className="block text-sm font-medium">Digite seu e-mail</label>
      <Input 
        label="Email"
        placeholder="Insira seu email"
        onChange={handleChangeEmail}
        value={email} // Controle com contexto
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