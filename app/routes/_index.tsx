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
 <div className="flex flex-col">
<Link to="/splash">Splash</Link>
<Link to="/menu">Dev Menu</Link>
 </div>
  );
}

