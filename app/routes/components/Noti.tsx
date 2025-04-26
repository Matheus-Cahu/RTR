import React, { useState } from 'react';
import { Bell } from 'lucide-react'; // Importa o sininho 🔔

export default function Noti() {
  const [mostrarMensagem, setMostrarMensagem] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-slate-100">
      
      {/* Botão é o ícone */}
      <button
        onClick={() => setMostrarMensagem(true)}
        className="p-3 rounded-full bg-indigo-500 hover:bg-indigo-600 text-white"
      >
        <Bell className="w-8 h-8" /> {/* Ícone de sininho */}
      </button>

      {/* Mensagem aparece depois */}
      {mostrarMensagem && (
        <div className="mt-6 text-center">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Nova Notificação!</h1>
          <p className="text-lg text-slate-600">Você clicou no sininho! 🔔🎉</p>
        </div>
      )}
      
    </div>
  );
}
