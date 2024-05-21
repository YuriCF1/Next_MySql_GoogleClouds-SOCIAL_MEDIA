import { FaThumbsUp, FaRegComment, FaPaperPlane } from 'react-icons/fa'

import { useEffect, useState } from 'react'

import IUser from '../app/interfaces/IUser'
import { IPost } from '../app/interfaces/IPost'

const Post = (props: { post: IPost }) => {
    const [user, setUser] = useState<IUser | undefined>(undefined)
    const { post_desc, img, username, userImg, created_at } = props.post

    useEffect(() => {
        let value = localStorage.getItem('rede-social:user');
        if (value) {
            setUser(JSON.parse(value))
        }
    }, [])

    let date = new Date(created_at)
    let formatedDate = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();

    return (
        <div className='w-1/3 bg-zinc-100 rounded-lg p-4 shadow-2xl m-1'>
            <header className='flex gap-2 pb-4 border-b items-center'>
                <img className="w-10 h-10 rounded-full" src={userImg ? userImg : 'https://i0.wp.com/digitalhealthskills.com/wp-content/uploads/2022/11/3da39-no-user-image-icon-27.png?fit=500%2C500&ssl=1'} alt="Imagem do usuário autor do poste" />
                <div className='flex flex-col'>
                    <span className='font-semibold'>{username}</span>
                    <span className='text-xs'>{formatedDate}</span>
                </div>
            </header>
            {post_desc && (
                <div className='py-4 w-full'>
                    <span>{post_desc}</span>
                </div>)}
            {img && <img className='rounded-lg' src={`./upload/${img}`} alt="Imagem do post" />}
            <div className='flex justify-between py-4 border-b'>
                <div className='flex gap-1 items-center'>
                    <button className='bg-blue-500 text-white w-8 h-8 p-2 items-center flex justify-center rounded-full text-2xl'>
                        <FaThumbsUp />
                    </button>
                    3
                </div>
                <span>5 comentários</span>
            </div>
            <div className='flex justify-around py-4 text-gray-600 border-b'>
                <button className='flex items-center gap-1'><FaThumbsUp />Curtir</button>
                <button className='flex items-center gap-1'><FaRegComment /> Comentar</button>
            </div>
            <div className='flex gap-2 pt-6'>
                <img src={user?.userImg ? user.userImg : 'https://i0.wp.com/digitalhealthskills.com/wp-content/uploads/2022/11/3da39-no-user-image-icon-27.png?fit=500%2C500&ssl=1'}
                    alt="Imagem de pefil do usuário" className="w-12 h-12 rounded-full" />
                <div className='w-full bg-zinc-100 flex items-center text-gray-600 px-3 py-1 rounded-full'>
                    <input className='bg-zinc-100 w-full focus-visible:outline-none border-4 rounded-full px-3 mx-5' type="text" />
                    <button>
                        <FaPaperPlane />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Post