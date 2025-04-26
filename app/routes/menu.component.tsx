import Footer from "./components/Footer";
import Input from "./components/Input";
import InputPicture from "./components/InputPicture";
import Rules from "./components/Rules";

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
            <button className="btn-azul1">Click Me</button>
            <button className="btn-azul1-vazado">Click Me</button>
            <button className="btn-azul1-claro">Click Me</button>
            <button className="btnr-azul1">Click Me</button>
            <button className="btnr-azul1-vazado">Click Me</button>
            <button className="btnr-azul1-claro">Click Me</button>
          </div>
          <div className="flex flex-col gap-4">
            {/* Botões vermelhos */}
            <button className="btn-vermelho1">Click Me</button>
            <button className="btn-vermelho1-vazado">Click Me</button>
            <button className="btn-vermelho1-claro">Click Me</button>
            <button className="btnr-vermelho1">Click Me</button>
            <button className="btnr-vermelho1-vazado">Click Me</button>
            <button className="btnr-vermelho1-claro">Click Me</button>
          </div>
          <div className="flex flex-col gap-4">
            {/* Botões verde-limão */}
            <button className="btn-limao1">Click Me</button>
            <button className="btn-limao1-vazado">Click Me</button>
            <button className="btn-limao1-claro">Click Me</button>
            <button className="btnr-limao1">Click Me</button>
            <button className="btnr-limao1-vazado">Click Me</button>
            <button className="btnr-limao1-claro">Click Me</button>
          </div>
          <div className="flex flex-col gap-4">
          <Input></Input>
          <InputPicture></InputPicture>
          <Rules></Rules>
          <Footer></Footer>
          </div>
          </div>
    );
}