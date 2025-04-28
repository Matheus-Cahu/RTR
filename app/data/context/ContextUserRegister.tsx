import React, { createContext, useContext, useState, ReactNode } from 'react';

interface UserRegisterContextProps {
    name: string;
    email: string;
    password: string;
    setName: (name: string) => void;
    setEmail: (email: string) => void;
    setPassword: (password: string) => void;
}

const UserRegisterContext = createContext<UserRegisterContextProps | undefined>(undefined);

export const UserRegisterProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <UserRegisterContext.Provider value={{ name, email, password, setName, setEmail, setPassword }}>
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