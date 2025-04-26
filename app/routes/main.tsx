import { Outlet } from "@remix-run/react";
import Footer from "./components/Footer";

export default function Main(){
    return(
        <div className="flex flex-col min-h-screen bg-cover bg-center bg-white">
            <div className="flex justify-center mt-8 mb-6">
                <img
                    src="/logo_dark.png"
                    alt="Rio Tênis Ranking"
                    className="w-40"
                />
            </div>
            <div className="flex-1 flex flex-col items-center">
                <Outlet />
            </div>
            <Footer />
        </div>
    )
}