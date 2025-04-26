interface SelectProps {
  label: string;
  options: string[];
}

export default function Select(props: SelectProps) {
  return (
    <div className="relative w-full">
      <label className="absolute -top-2 left-2 bg-white px-1 text-sm text-slate-600">
        {props.label}
      </label>
      <select
        className="w-full bg-transparent border border-teal-700 rounded-md px-4 py-3 text-black placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-teal-700"
      >
        {props.options.map((option, index) => (
          <option key={index} value={option} className="text-black">
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}