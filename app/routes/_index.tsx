import type { MetaFunction } from "@remix-run/node";
import Input from "./components/Input";
import { Link } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
<<<<<<< HEAD
    <div className="flex h-screen items-start justify-center bg-slate-200">
      <div className="flex  items-center justify-center "> 
        <img src="/public/RTR__2_-removebg-preview.png" className=""  alt="logo"/>
      </div>
=======
    <div className="flex h-screen items-center justify-center">
    <Link to="/menu" className="btn-verde1">Menu</Link>
>>>>>>> 2646d2e (Add Modelos de data users e componentes btn)
    </div>
 
  );
}

