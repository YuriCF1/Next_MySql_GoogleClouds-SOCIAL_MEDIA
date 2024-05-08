'use client'

import Link from "next/link"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaSearch, FaBell } from 'react-icons/fa'
import { TbMessageCircle2Filled } from "react-icons/tb"

const header = () => {
    const [user, setUser] = useState({ username: '', userImg: '' });
    const [showMenu, setShowMenu] = useState(false);
    const router = useRouter();

    useEffect(() => {
        let value = localStorage.getItem('rede-social:user');
        if (value) {
            setUser(JSON.parse(value))
        }
    }, [])

    const logout = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault()
        localStorage.removeItem('rede-social:token')
        router.push('/login')
    }

    return (
        <header className="w-full bg-white flex justify-between py-2 px-4 items-center shadow-md h-16">
            <Link className="font-bold text-sky-900 text-lg" href='/'>DevPics</Link>
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
                        <img src={user.userImg.length > 0 ? user.userImg : 'https://i0.wp.com/digitalhealthskills.com/wp-content/uploads/2022/11/3da39-no-user-image-icon-27.png?fit=500%2C500&ssl=1'} alt="Imagem de pefil do usuário" className="w-12 h-12 rounded-full" />
                        <span className="font-bold">{user.username}</span>
                    </button>
                    {showMenu &&
                        <div className="absolute flex flex-col bg-white p-4 shadow-md rounded-md gap-2 border-t whitespace-nowrap right-[-15px]">
                            <Link className="border-b border-stone-200" href={''}>Editar perfil</Link>
                            <Link onClick={(e) => logout(e)} href={''}>Sair</Link>
                        </div>
                    }
                </div>
            </div>
        </header>
    )
}

export default header