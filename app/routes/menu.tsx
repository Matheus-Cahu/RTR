import { Link, Outlet } from "@remix-run/react";


export default function Index() {
  return (
    <div className="flex flex-col gap-10 h-screen items-center justify-center">
        <Link to='component' className="btn-verde1">Components</Link>
    <Outlet/>
    </div>
  );
}

