interface InputProps {
  label: string;
  placeholder: string;
  type: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input(props: InputProps){
    return(
      <div className="relative w-full">
      <label className="absolute -top-2 left-2 bg-white px-1 text-sm text-slate-600">{props.label}</label>
      <input
        onChange={props.onChange}
        type={props.type}
        placeholder={props.placeholder}
        className="w-full bg-transparent border border-teal-700 rounded-md px-4 py-3 text-gray-600 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-teal-700"
      />
      </div> 
    )
}