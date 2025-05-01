import { useState, useEffect } from "react";
import { useNavigate } from "@remix-run/react";
import Input from "./components/Input";



export default function LoginSenha() {
  const [senha, setSenha] = useState("");
  const [email, setEmail] = useState("");

  return (
    <div>
      <Input label="Email" placeholder="Digite seu email" onChange={() => setEmail}/>

      <button
        className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700"
      >
        Entrar
      </button>
      </div>
  );
}
