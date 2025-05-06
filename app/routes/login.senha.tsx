import { Form, useActionData } from "@remix-run/react";
import Input from "./components/Input";
import { useUserLogin } from "~/data/context/ContextUserLogin";
import { json, redirect } from "@remix-run/node";
import { sessionStorage } from "~/session.server";

// --- HANDLE THE REQUEST ON THE SERVER --- //
export const action = async ({ request }) => {
  // Pega os dados do formulário
  const form = await request.formData();
  const email = form.get("email");
  const password = form.get("password");

  // Debug: imprime todos os valores recebidos
  console.log("=== [ACTION] Form recebido ===");
  for (const [key, value] of form.entries()) {
    console.log(`[${key}]:`, value);
  }
  console.log("Email isolado:", email);
  console.log("Password isolado:", password);

  // Validação básica dos campos
  if (!email || typeof email !== "string" || !email.includes("@")) {
    console.warn("[ACTION][ERRO] Email ausente ou inválido!");
    return json({ error: "O campo de email está ausente ou inválido." }, { status: 400 });
  }
  if (!password || typeof password !== "string" || password.length < 3) {
    console.warn("[ACTION][ERRO] Senha ausente ou muito curta!");
    return json({ error: "Você precisa preencher a senha corretamente." }, { status: 400 });
  }

  // Segue o código normal...
  // Exemplo de fetch (apenas se as validações passaram)
  try {
    const response = await fetch("http://localhost:5042/api/Users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email,
        password
      }),
    });
    const result = await response.json();

    // Se quiser, imprime retorno da API
    console.log("[ACTION] Resposta da API externa:", result);

    if (!response.ok) {
      return json({ error: result?.error || "Erro ao autenticar." }, { status: response.status });
    }

    // Retorno para o front
    const session = await sessionStorage.getSession(request.headers.get("Cookie"));
    session.set("currentUser", result); // ou resultado correto do backend

    // Redireciona com Set-Cookie no header!
    return redirect("/main/ranking", {
      headers: {
        "Set-Cookie": await sessionStorage.commitSession(session)
      }
    });
  } catch (err) {
    console.error("[ACTION][ERRO] Falha ao comunicar com a API:", err);
    return json({ error: "Erro inesperado ao acessar a API.", debug: String(err) }, { status: 500 });
  }
};

export default function LoginSenha() {
  const { email, password, setPassword } = useUserLogin();
  const actionData = useActionData();

return (
    <div className="flex flex-col items-center gap-4 justify-center h-screen bg-cover bg-center bg-white">
      <Form method="post" className="w-full flex flex-col items-center gap-4">
        <input type="hidden" name="email" value={email} />
        <Input
          label="Senha"
          placeholder="Digite sua senha"
          name="password"
          type="password"
          value={password}
          onChange={event => setPassword(event.target.value)}
        />
        <button
          type="submit"
          className="w-3/4 max-w-xs bg-green-600 text-white text-lg font-bold py-3 rounded-md hover:bg-green-700 transition"
        >
          Entrar
        </button>
        {actionData?.error && (
          <div className="text-red-500 font-semibold">
            {typeof actionData.error === 'string'
              ? actionData.error
              : JSON.stringify(actionData.error)}
          </div>
        )}
        {actionData?.success && (
          <div className="text-green-600 font-semibold">
            Bem-vindo, {actionData.user?.name || "usuário!"}
          </div>
        )}
      </Form>
    </div>
  );
}