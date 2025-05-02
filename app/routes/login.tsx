import { Outlet, Link } from "@remix-run/react";
import { User, X } from "lucide-react";
import { UserLoginProvider } from "~/data/context/ContextUserLogin";

export default function Login() {
  return (
    <UserLoginProvider>
    <div className="flex flex-col items-center justify-center h-screen bg-white">
      <div className="mb-12">
        <Link to="/splash">
          <X className="w-6 h-6 text-black cursor-pointer" />
        </Link>
        <img
          src="/logo_dark.png"
          alt="Rio Tênis Ranking"
          className="w-40"
        />
      </div>
      <Outlet />
    </div>
    </UserLoginProvider>
  );
}
