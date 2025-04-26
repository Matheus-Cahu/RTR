import userList from "~/data/users";
import Select from "./components/Select";
import Input from "./components/Input";

export default function marcar_jogo() {
  return (
    <div className="flex flex-col items-center justify-center ">
      <h1 className="h1 mb-4">Marcar Jogo</h1>
      <form className="flex flex-col gap-4">
      <Select label="Dropdown" options={userList.map(user => user.name)}></Select>
        <Input label="Local" placeholder="Local do jogo"></Input>
        {/* Data Picker */}
        <button
          className="btn-azul mb-2"
        >
          Marcar Jogo
        </button>
      </form>
    </div>
  );
}