<<<<<<< HEAD
import {
  ShoppingCart,
  PlayCircle,
  Trophy,
  LayoutDashboard,
} from "lucide-react";
=======
import { ShoppingCart, PlayCircle, Trophy, User } from 'lucide-react';
>>>>>>> 95ed7a43d9092a2662d05cbf50b598ceebb7da45

export default function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-black rounded-t-3xl py-4 flex justify-around items-center">
      <a href="/app/routes/main.shop.tsx">
        <ShoppingCart className="text-white w-8 h-8" />
      </a>
      <a href="jogos">
        <PlayCircle className="text-white w-8 h-8" />
      </a>
      <a href="ranking">
        <Trophy className="text-white w-8 h-8" />
      </a>
      <a href="profile">
        <User className="text-white w-8 h-8" />
      </a>
    </footer>
  );
}
