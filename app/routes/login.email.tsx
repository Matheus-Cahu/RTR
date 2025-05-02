import { useState } from "react";
import { useNavigate } from "@remix-run/react";
import Input from "./components/Input"; // Ajuste o caminho conforme necessário

export default function LoginEmail() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Armazena o e-mail em localStorage 
    localStorage.setItem("loginEmail", email);
    navigate("/login/senha");
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
      <label className="block text-sm font-medium">Digite seu e-mail</label>
      <Input label="Email" placeholder="Insira seu email" onChange={() => {console.log("Login")}}></Input>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700">
        Continuar
      </button>
    </form>
  );
}
