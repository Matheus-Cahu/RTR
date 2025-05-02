import React, { createContext, useContext, useState, ReactNode } from 'react';

interface UserLoginContextProps {
    email: string;
    password: string;
    setEmail: (email: string) => void;
    setPassword: (password: string) => void;
}

const UserLoginContext = createContext<UserLoginContextProps | undefined>(undefined);

export const UserLoginProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <UserLoginContext.Provider
            value={{
                email,
                password,
                setEmail,
                setPassword,
            }}
        >
            {children}
        </UserLoginContext.Provider>
    );
};

export const useUserLogin = (): UserLoginContextProps => {
    const context = useContext(UserLoginContext);
    if (!context) {
        throw new Error('useUserLogin must be used within a UserLoginProvider');
    }
    return context;
};