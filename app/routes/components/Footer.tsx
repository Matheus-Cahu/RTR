import { ShoppingCart , PlayCircle, Trophy, LayoutDashboard} from 'lucide-react';

export default function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-black rounded-t-3xl py-4 flex justify-around items-center">
      <a href="#carrinho">
        <ShoppingCart className="text-white w-8 h-8" />
      </a>
      <a href="#play">
        <PlayCircle className="text-white w-8 h-8" />
      </a>
      <a href="#trofeu">
        <Trophy className="text-white w-8 h-8" />
      </a>
      <a href="#dashboard">
        <LayoutDashboard className="text-white w-8 h-8" />
      </a>
    </footer>
  );
}