import Shop from "./components/Shop";
import {
  ShoppingCart,
  PlayCircle,
  Trophy,
  LayoutDashboard,
} from "lucide-react";

export default function main_shop() {
  return (
    <div>
      <header>
        <h1 className="h1-center font-montserrat mb-6">Loja</h1>
        <h2 className="h2-center font-montserrat mb-6">Seja bem vindo</h2>
        <a
          href=""
          className="absolute  flex justify-right items-center top-4 right-4 bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-shadow duration-300"
        >
          <ShoppingCart className="text-black w-8 h-8" />
        </a>
      </header>
      <div className="flex flex-col items-center justify-center h-screen rounded-none bg-gray-100">
        <Shop />
      </div>
    </div>
  );
}
