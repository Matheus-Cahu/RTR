import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface DatePickerCustomProps {
  selected: Date | null;
  onChange: (date: Date | null) => void;
}

export default function DatePickerCustom({ selected, onChange }: DatePickerCustomProps) {
  return (
    <DatePicker 
      selected={selected} 
      onChange={onChange}
      dateFormat="dd/MM/yyyy"
      placeholderText="Selecione a data"
      className="border rounded px-2 py-2 w-full"
    />
  );
}