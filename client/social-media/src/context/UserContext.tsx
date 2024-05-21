"use client"

import { createContext, useState, useEffect } from "react"

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
    const [user, setUser] = useState(initialValue.user)

    useEffect(() => {
        const UserJson = localStorage.getItem("rede-social:user")
        if (UserJson) {
            setUser(JSON.parse(UserJson))
        }
    }, [])

    return (
        <UserContext.Provider value={{
            user,
            setUser
        }}>
            {children}
        </UserContext.Provider>
    )
}
