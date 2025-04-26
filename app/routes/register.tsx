import { Outlet, Link } from "@remix-run/react";
import { X } from "lucide-react";

export default function Register() {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-cover bg-center bg-white">
            <div className="mb-12">
                <Link to="/splash">
                <X className="w-6 h-6 text-black cursor-pointer" />
                </Link>
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