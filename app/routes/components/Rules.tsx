
export default function Rules(){
    return(
        <div className="space-y-4 p-6 bg-slate-200 rounded-lg shadow-md">
  <div className="flex items-center bg-slate-400 rounded-md">
    <button className="flex-1 text-left p-2 text-white">Matricula</button>
    <button className="p-2 text-white">{'>'}</button>
  </div>

  <div className="flex items-center bg-slate-400 rounded-md">
    <button onClick={()=>{
        
    }}   className="flex-1 text-left p-2 text-white">Ranking</button>
    <button className="p-2 text-white">{'>'}</button>
  </div>

  <div className="flex items-center bg-slate-400 rounded-md">
    <button className="flex-1 text-left p-2 text-white">Jogos</button>
    <button className="p-2 text-white">{'>'}</button>
  </div>

  <div className="flex items-center bg-slate-400 rounded-md">
    <button className="flex-1 text-left p-2 text-white">Loja</button>
    <button  className="p-2 text-white">{'>'}</button>
  </div>

  <div className="flex items-center bg-slate-400 rounded-md">
    <button className="flex-1 text-left p-2 text-white">Parceria</button>
    <button className="p-2 text-white">{'>'}</button>
  </div>
</div>

    );
}