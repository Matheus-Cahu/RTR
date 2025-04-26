import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ImageInput() {
  const [image, setImage] = useState(null);
  const inputRef = useRef();

  function handleChange(e) {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = ev => setImage(ev.target.result);
      reader.readAsDataURL(file);
    }
  }

  function handleClick() {
    if (!image && inputRef.current) inputRef.current.click();
  }

  function handleRemove(e) {
    e.stopPropagation();
    setImage(null);
    if (inputRef.current) inputRef.current.value = "";
  }

  return (
    <div
      className={`w-56 h-56 flex items-center justify-center transition-all duration-300 overflow-hidden relative 
        ${image ? "rounded-full border-0 bg-transparent" : "rounded-lg border-2 border-teal-800 border-dashed bg-white text-teal-800 hover:bg-teal-50"}
      `}
      onClick={handleClick}
      style={{ cursor: image ? "default" : "pointer" }}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="hidden"
      />

      <AnimatePresence>
        {image ? (
          <>
            <motion.img
              key="image"
              src={image}
              alt="Foto do perfil"
              className="w-full h-full object-cover rounded-full"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            />
            <motion.button
              key="remove-button"
              type="button"
              onClick={handleRemove}
              className="absolute top-2 right-2 bg-white border border-gray-400 rounded-full p-1 flex items-center justify-center shadow-lg hover:bg-red-100 transition"
              aria-label="Remover imagem"
              style={{ zIndex: 10 }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-red-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={3}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </motion.button>
          </>
        ) : (
          <motion.div
            key="upload-placeholder"
            className="flex flex-col items-center select-none"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-12 h-12"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M7.5 12l4.5-4.5m0 0L16.5 12m-4.5-4.5V19"
              />
            </svg>
            <p className="mt-4 text-teal-800 font-medium">Carregue sua foto</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
