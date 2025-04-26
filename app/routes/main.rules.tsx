import Rules from "./components/Rules";
import { ArrowLeft } from "lucide-react";

export default function main_rules() {
  return (
    <div className=" flex " >
      <div >
        <a href="/main/ranking">
          <ArrowLeft className="w-8 h-8 text-black mb-3" />
          </a>
          <Rules/>
      </div> 


    </div>

  );
}