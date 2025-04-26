import { ShoppingCart, PlayCircle, Trophy, User } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-black rounded-t-3xl py-4 flex justify-around items-center">
      <a href="loja">
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