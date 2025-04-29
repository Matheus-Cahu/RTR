import React, { createContext, useContext, useState, ReactNode } from 'react';

interface UserRegisterContextProps {
    name: string;
    email: string;
    password: string;
    image: File | null; // Campo para armazenar a imagem
    setName: (name: string) => void;
    setEmail: (email: string) => void;
    setPassword: (password: string) => void;
    setImage: (image: File | null) => void; // Setter para atualizar a imagem
}

const UserRegisterContext = createContext<UserRegisterContextProps | undefined>(undefined);

export const UserRegisterProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [image, setImage] = useState<File | null>(null); // Estado para armazenar a imagem

    return (
        <UserRegisterContext.Provider
            value={{
                name,
                email,
                password,
                image,
                setName,
                setEmail,
                setPassword,
                setImage,
            }}
        >
            {children}
        </UserRegisterContext.Provider>
    );
};

export const useUserRegister = (): UserRegisterContextProps => {
    const context = useContext(UserRegisterContext);
    if (!context) {
        throw new Error('useUserRegister must be used within a UserRegisterProvider');
    }
    return context;
};