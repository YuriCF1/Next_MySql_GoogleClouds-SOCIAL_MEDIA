'use client'

import { useMutation } from "@tanstack/react-query";
import Link from "next/link"
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { FaSearch, FaBell } from 'react-icons/fa'
import { TbMessageCircle2Filled } from "react-icons/tb"
import { makeRequest } from "../../axios";
import { UserContext } from "@/context/UserContext";

const header = () => {
    const { user, setUser } = useContext(UserContext)
    const [showMenu, setShowMenu] = useState(false);
    const router = useRouter();

    const mutation = useMutation({
        mutationFn: async () => {
            return await makeRequest.post("auth/logout").then((res) => {
                res.data
            })
        },
        onSuccess: () => {
            localStorage.removeItem("rede-social:user");
            router.push("login")
            setUser(undefined)
        }
    })

    return (
        <header className="fixed z-10 w-full bg-white flex justify-between py-2 px-4 items-center shadow-md h-16">
            <Link className="font-bold text-sky-900 text-lg" href='/main'>DevPics</Link>
            <div className="flex bg-zinc-100 items-center text-gray-600 px-3 py-1 rounded-full">
                <input className="bg-zinc-100 focus:outline-none" placeholder="Pesquisar" type="text" />
                <FaSearch />
            </div>
            <div className="flex gap-5 items-center text-gray-600">
                <div className="flex gap-3">
                    <button className="bg-zinc-200 p-2 rounded-full hover:bg-zinc-300">
                        <TbMessageCircle2Filled />
                    </button>
                    <button className="bg-zinc-200 p-2 rounded-full hover:bg-zinc-300">
                        <FaBell />
                    </button>
                </div>
                <div onMouseLeave={() => setShowMenu(false)} className="relative">
                    <button onClick={() => setShowMenu(!showMenu)} className="flex gap-2 items-center">
                        <img src={user
                            ?
                            user.userImg : 'https://i0.wp.com/digitalhealthskills.com/wp-content/uploads/2022/11/3da39-no-user-image-icon-27.png?fit=500%2C500&ssl=1'}
                            alt="Imagem de pefil do usuário" className="w-12 h-12 rounded-full" />
                        <span className="font-bold">{user?.username}</span>
                    </button>
                    {showMenu &&
                        <div className="absolute flex flex-col bg-white p-4 shadow-md rounded-md gap-2 border-t whitespace-nowrap right-[-15px]">
                            <Link className="border-b border-stone-200" href={''}>Editar perfil</Link>
                            {/* Precisa do mutate para acessar a função criada lá em cima */}
                            <button onClick={() => mutation.mutate()}>Sair</button>
                        </div>
                    }
                </div>
            </div>
        </header>
    )
}

export default header