import { Link } from "@remix-run/react";
import React from "react";

export default function Splash() {
  return (
    <div
      className="flex flex-col items-center justify-center h-screen bg-cover bg-center"
      style={{
        background: "linear-gradient(to bottom, #D4FF00, #338D3E)"
    }}
    >
      {/* Logo */}
      <div className="mb-12">
        <img
          src="logo_dark.png" // Substitua pelo caminho da logo
          alt="Rio Tênis Ranking"
          className="w-40"
        />
      </div>

      {/* Botão de Entrar */}
      <Link to="/login/email" className="w-full flex justify-center">
      <button className="btn-verde1 mb-2 w-1/2">
        ENTRAR
      </button>
      </Link>
      {/* Link para criar conta */}
      <p className="mt-6 text-white text-sm">
        Não é cadastrado?{" "}
        <a href="/register/email" className="underline font-medium hover:text-gray-300">
          Crie uma conta
        </a>
      </p>
    </div>
  );
}