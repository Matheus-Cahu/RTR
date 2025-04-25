import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div className="flex h-screen items-start justify-center bg-slate-200">
      <div className="flex  items-center justify-center "> 
        <img src="/public/RTR__2_-removebg-preview.png" className=""  alt="logo"/>
      </div>
    </div>
 
  );
}

