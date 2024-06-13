'use client'

import { useMutation, useQuery } from "@tanstack/react-query";
import Link from "next/link"
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { FaSearch, FaBell } from 'react-icons/fa'
import { TbMessageCircle2Filled } from "react-icons/tb"
import { makeRequest } from "../../axios";
import { UserContext } from "@/context/UserContext";
import IUser from "@/app/interfaces/IUser";

const header = () => {
    const { user, setUser } = useContext(UserContext)
    const [showMenu, setShowMenu] = useState(false);
    const router = useRouter();

    const [search, setSearch] = useState<string | null>(null)
    const [reults, setResults] = useState(false)

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

    const { data, error } = useQuery({
        queryKey: ['search', search],
        queryFn: async () => {
            console.log('Search', search);
            const res = await makeRequest.get('search/search-users?params=' + search);
            return res.data;
        },
        enabled: !!search
    })

    if (error) {
        console.log(error);
    }

    return (
        <header onMouseLeave={() => setResults(false)} onMouseEnter={() => setResults(true)} className="fixed z-10 w-full bg-white flex justify-between py-2 px-4 items-center shadow-md h-16">
            <Link className="font-bold text-sky-900 text-lg" href='/main'>DevPics</Link>
            <div className="relative flex bg-zinc-100 items-center text-gray-600 px-3 py-1 rounded-full">
                <input onChange={(e) => setSearch(e.target.value)} value={search ? search : ''} className="bg-zinc-100 focus:outline-none" placeholder="Pesquisar" type="text" />
                <FaSearch />
                {search && reults &&
                    <div className="absolute flex flex-col bg-white p-4 shadow-md rounded-md gap-2 border-t whitespace-nowrap right-0 left-0 top-[100%]">
                        {data?.map((usersFound: IUser, id: number) => {
                            return (
                                <Link onClick={() => { setResults(false), setSearch(null) }} href={'/profile?id=' + usersFound?.id} key={id} className="flex items-center gap-2 py-2 border-b border-stone-200">
                                    <img src={
                                        usersFound.userImg
                                            ? usersFound.userImg
                                            : 'https://i0.wp.com/digitalhealthskills.com/wp-content/uploads/2022/11/3da39-no-user-image-icon-27.png?fit=500%2C500&ssl=1'}
                                        alt="Imagem de pefil do usuário" className="w-12 h-12 rounded-full" />
                                    <span className="font-bold">{usersFound.username}</span>
                                </Link>
                            )
                        })
                        }
                        <Link href={"/search?params=" + search} className="font-semibold border-t border-zinc-700 text-center pt-2">Ver todos os resultados</Link>
                    </div>
                }
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
                <div className="relative">
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
        </header >
    )
}

export default header