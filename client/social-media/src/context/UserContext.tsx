"use client"

import { createContext, useState } from "react"

interface ContextProps {
    children: React.ReactNode
}

interface User {
    user: {
        id: number;
        email: string;
        username: string;
        userImg: string;
        bgImg: string;
    }
    | undefined;
    setUser: (newState: any) => void
}

const initialValue = {
    user: undefined,
    setUser: () => { }
}

//Criando o context 
export const UserContext = createContext<User>(initialValue)

export const UserContextProvider = ({ children }: ContextProps) => {
    let UserJson = localStorage.getItem("rede-social:user")
    const [user, setUser] = useState(
        UserJson ? JSON.parse(UserJson) : initialValue.user //Caso haja no local storage, ele transforma em um objeto. Caso n, undefined
    )

    return (
        <UserContext.Provider value={{
            user,
            setUser
        }}>
            {children}
        </UserContext.Provider>
    )
}