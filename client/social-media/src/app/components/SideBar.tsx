import Link from "next/link"

import { FaUserFriends, FaAlignLeft, FaPeopleArrows, FaStore, FaFlag, FaBookmark, FaCalendar } from 'react-icons/fa'
import {TbDeviceImac, TbClockHour4} from 'react-icons/tb'

const SideBar = () => {
    return (
        <aside>
            <nav>
                <Link href={''}><img src="" alt="" />
                    <span>Usuário</span>
                </Link>
                <Link href={''}>
                    <FaUserFriends />
                    Amigos
                </Link>
                <Link href={''}>
                    <FaAlignLeft />
                </Link>
                <Link href={''}>
                    <FaPeopleArrows />
                    Grupos
                </Link>
                <Link href={''}>
                    <FaStore />
                    Loja
                </Link>
                <Link href={''}>
                    <TbDeviceImac />
                    Watch
                </Link>
                <Link href={''}>
                    <TbClockHour4 />
                    Lembranças
                </Link>
                <Link href={''}><FaBookmark />Salvo</Link>
                <Link href={''}><FaCalendar />Eventos</Link>
                <Link href={''}></Link>
            </nav>
        </aside>
    )
}

export default SideBar