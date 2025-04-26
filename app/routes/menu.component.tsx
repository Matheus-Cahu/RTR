import Input from "./components/Input";
import InputPicture from "./components/InputPicture";

export default function components() {
    return (
<div className="flex flex-row gap-4">
          <div className="flex flex-col gap-4">
            {/* Botões verdes */}
            <button className="btn-verde1">Click Me</button>
            <button className="btn-verde1-vazado">Click Me</button>
            <button className="btn-verde1-claro">Click Me</button>
            <button className="btnr-verde1">Click Me</button>
            <button className="btnr-verde1-vazado">Click Me</button>
            <button className="btnr-verde1-claro">Click Me</button>
          </div>
          <div className="flex flex-col gap-4">
            {/* Botões azuis */}
            <button className="btn-azul">Click Me</button>
            <button className="btn-azul-vazado">Click Me</button>
            <button className="btn-azul-claro">Click Me</button>
            <button className="btnr-azul">Click Me</button>
            <button className="btnr-azul-vazado">Click Me</button>
            <button className="btnr-azul-claro">Click Me</button>
          </div>
          <div className="flex flex-col gap-4">
            {/* Botões vermelhos */}
            <button className="btn-vermelho">Click Me</button>
            <button className="btn-vermelho-vazado">Click Me</button>
            <button className="btn-vermelho-claro">Click Me</button>
            <button className="btnr-vermelho">Click Me</button>
            <button className="btnr-vermelho-vazado">Click Me</button>
            <button className="btnr-vermelho-claro">Click Me</button>
          </div>
          <div className="flex flex-col gap-4">
            {/* Botões verde-limão */}
            <button className="btn-limao">Click Me</button>
            <button className="btn-limao-vazado">Click Me</button>
            <button className="btn-limao-claro">Click Me</button>
            <button className="btnr-limao">Click Me</button>
            <button className="btnr-limao-vazado">Click Me</button>
            <button className="btnr-limao-claro">Click Me</button>
          </div>
           <div className="flex flex-col gap-4">
          <Input label="Template" placeholder="Template"></Input>
          <InputPicture></InputPicture>
          </div>
          </div>
    );
}