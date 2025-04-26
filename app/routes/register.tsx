import { Outlet } from "@remix-run/react";

export default function Register() {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-cover bg-center bg-white">
            <div className="mb-12">
        <img
          src="/logo_dark.png" // Substitua pelo caminho da logo
          alt="Rio Tênis Ranking"
          className="w-40"
        />
      </div>
      <Outlet />
        </div>   
    )
}