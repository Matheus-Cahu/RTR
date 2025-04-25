export default function Input(){
    return(
        <div className="relative w-full">
        <label className="absolute -top-2 left-2 bg-white px-1 text-sm text-slate-600">Email</label>
        <input
          type="email"
          placeholder="Insira seu email"
          className="w-full border border-teal-700 rounded-md px-4 py-3 text-gray-600 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-teal-700"
        />
      </div> 
    )
}