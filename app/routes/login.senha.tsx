import { Form, useActionData } from "@remix-run/react";
import Input from "./components/Input";
import { useUserLogin } from "~/data/context/ContextUserLogin";
import { commitSession, getSession } from "../session.server";
import bcrypt from "bcryptjs";
import { json, redirect } from "@remix-run/node";

// Função para buscar usuário via API externa:
/*export async function getUserFromDB(email) {
  if (!email) return null;

  const apiUrl = `http://localhost:5042/api/Users/by-email?email=${encodeURIComponent(email)}`;
  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: { "Accept": "application/json" }
    });

    if (response.status === 404) return null;
    if (!response.ok) throw new Error("Erro ao buscar usuário.");

    return await response.json();
  } catch (error) {
    console.error("Erro ao buscar usuário na API:", error);
    return null;
  }
}
*/
// Remix action: recebe email e senha do form
export const action = async ({ request }) => {
  const form = await request.formData();
  const email = form.get("email");
  const password = form.get("password");

  const apiUrl = "http://localhost:5042/api/Users/login";
  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (response.status === 401) {
    const { message } = await response.json();
    return json({ error: message || "Credenciais inválidas." }, { status: 401 });
  }
  if (!response.ok) return json({ error: "Erro no servidor." }, { status: 500 });

  const user = await response.json();

  // LOGIN OK: cria a sessão normalmente
  const session = await getSession(request.headers.get("Cookie"));
  session.set("userId", user.id);
  return redirect("/", {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
};

// Componente React - Formulário tipo Remix
export default function LoginSenha() {
  const { email, password, setPassword } = useUserLogin();
  const actionData = useActionData();

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };

  return (
    <div className="flex flex-col items-center gap-4 justify-center h-screen bg-cover bg-center bg-white">
      <Form method="post" className="w-full flex flex-col items-center gap-4">
        {/* O email precisa ser transmitido (vem do contexto) */}
        <input type="hidden" name="email" value={email} />
        <Input
          label="Senha"
          placeholder="Digite sua senha"
          name="password"
          type="password"
          value={password || ""}
          onChange={handleChangePassword}
        />
        <button
          type="submit"
          className="w-3/4 max-w-xs bg-green-600 text-white text-lg font-bold py-3 rounded-md hover:bg-green-700 transition"
        >
          Entrar
        </button>
        {actionData?.error &&
          <div className="text-red-500 font-semibold">{actionData.error}</div>
        }
      </Form>
    </div>
  );
}