import { Outlet } from "@remix-run/react";
import Footer from "./components/Footer";

export default function Main(){
    return(
        <div className="flex flex-col items-center gap-4 justify-center h-screen bg-cover bg-center bg-white">
            <img
                src="/logo_dark.png" // Substitua pelo caminho da logo
                alt="Rio Tênis Ranking"
                className="w-40"
            />
            <Outlet />
            <Footer />
        </div>
    )
}