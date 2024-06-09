//Não precisa colocar o use client aqui, pois  o no componente pai já temstill 

import Link from "next/link"
import { useContext } from "react"
import { UserContext } from "@/context/UserContext"

import { FaUserFriends, FaAlignLeft, FaPeopleArrows, FaStore, FaFlag, FaBookmark, FaCalendar } from 'react-icons/fa'
import { TbDeviceImac, TbClockHour4 } from 'react-icons/tb'

const SideBar = () => {
    const { user } = useContext(UserContext)

    return (
        <aside className="w-1/6 pl-4">
            <nav className="flex flex-col gap-6 text-gray-600 font-semibold bg-white">
                <Link className="flex gap-2 pb-6 items-center" href={`/profile?id=${user?.id}`}><img src="" alt="" />
                    <img src={user?.userImg ? user.userImg : 'https://i0.wp.com/digitalhealthskills.com/wp-content/uploads/2022/11/3da39-no-user-image-icon-27.png?fit=500%2C500&ssl=1'}
                        alt="Imagem de pefil do usuário" className="w-12 h-12 rounded-full" />
                    <span>{user?.username}</span>
                </Link>
                <Link className="flex gap-3 items-center" href={''}>
                    <FaUserFriends className="w-6 h-6" />
                    Amigos
                </Link>
                <Link className="flex gap-3 items-center" href={''}>
                    <FaAlignLeft className="w-6 h-6" />
                </Link>
                <Link className="flex gap-3 items-center" href={''}>
                    <FaPeopleArrows className="w-6 h-6" />
                    Grupos
                </Link>
                <Link className="flex gap-3 items-center" href={''}>
                    <FaStore className="w-6 h-6" />
                    Loja
                </Link>
                <Link className="flex gap-3 items-center" href={''}>
                    <TbDeviceImac className="w-6 h-6" />
                    Watch
                </Link>
                <Link className="flex gap-3 items-center" href={''}>
                    <TbClockHour4 className="w-6 h-6" />
                    Lembranças
                </Link>
                <Link className="flex gap-3 items-center" href={''}>
                    <FaBookmark className="w-6 h-6" />
                    Salvo
                </Link>
                <Link className="flex gap-3 items-center" href={''}>
                    <FaCalendar className="w-6 h-6" />
                    Eventos
                </Link>
            </nav>
        </aside>
    )
}

export default SideBar