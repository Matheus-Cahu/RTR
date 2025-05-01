import { useState, useEffect } from "react";
import { useNavigate } from "@remix-run/react";
import axios from "axios";

export default function LoginSenha() {
  const [senha, setSenha] = useState("");
  const [email, setEmail] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedEmail = localStorage.getItem("loginEmail");
    if (!storedEmail) {
      navigate("/login/email");
    } else {
      setEmail(storedEmail);

      // Exemplo: buscar avatar pela API
      axios.get(`http://localhost:8000/api/usuarios/avatar?email=${storedEmail}`)
        .then(res => {
          setAvatarUrl(res.data.avatarUrl); 
        })
        .catch(() => {
          setAvatarUrl("/default-avatar.png");
        });
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro("");

    try {
      const response = await axios.post("http://localhost:8000/api/login", {
        email,
        senha,
      });

      localStorage.setItem("token", response.data.token);
      navigate("/ranking");
    } catch {
      setErro("Senha incorreta.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4 text-center">
      {avatarUrl && (
        <img src={avatarUrl} alt="Avatar" className="mx-auto w-24 h-24 rounded-full" />
      )}
      <p className="text-lg font-medium mt-2">{email}</p>

      {erro && <p className="text-red-500 text-sm">{erro}</p>}

      <input
        type="password"
        className="w-full border rounded-lg p-2 mt-4"
        placeholder="Digite sua senha"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
        required
      />

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700"
      >
        Entrar
      </button>
    </form>
  );
}
