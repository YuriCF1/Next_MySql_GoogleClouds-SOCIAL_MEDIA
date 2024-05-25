import Comment from './Comment'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useContext, useState } from 'react'
import { UserContext } from '@/context/UserContext'

import { FaThumbsUp, FaRegComment, FaPaperPlane } from 'react-icons/fa'

import { IPost } from '../app/interfaces/IPost'
import IComment from '@/app/interfaces/IComent'

import moment from 'moment'
import "moment/locale/pt-br"
import { makeRequest } from '../../axios'

const Post = (props: { post: IPost }) => {
    const { post_desc, img, username, userImg, created_at, id } = props.post
    const { user } = useContext(UserContext)
    const queryCLient = useQueryClient()

    const [comment_desc, setComment_desc] = useState("")

    const [showComment, setShowComment] = useState(false)

    /*
    React Query usa essa chave para armazenar e buscar dados no cache. Se você já buscou comentários para o post 1, esses dados serão armazenados sob a 
    chave ["comments", 1]. Ao fazer a mesma consulta novamente, os dados cacheados serão usados em vez de fazer uma nova requisição.
    */

    const { data, error, isLoading } = useQuery<IComment[] | undefined>({
        queryKey: ["comments", id],//Colocando o 'id' para fazer uma query diferente para cada post. Colocando id para dizer que tem uma KEY para cada post
        queryFn: () => makeRequest.get("comments/?post_id=" + id).then((res) => {
            return res.data.data
        }),
        enabled: !!id //Só ativa a query quando tiver o parâmetro id
    })

    if (error) {
        console.log(error);
    }

    const mutation = useMutation({
        mutationFn: async (newComment: {}) => {
            await makeRequest.post("comments/", newComment).then((res) => {
                return res.data
            })
        },
        onSuccess: () => {
            //Fazendo o reset da queryKey, para toda vez que fiver um comentário novo, ele refaz a query
            queryCLient.invalidateQueries({ queryKey: ["comments", id] })
        }
    })

    const shareComment = async () => {
        mutation.mutate({ comment_desc, comment_user_id: user?.id, post_id: id })
        setComment_desc('')
    }

    return (
        <div className='w-1/3 bg-zinc-100 rounded-lg p-4 shadow-2xl m-1'>
            <header className='flex gap-2 pb-4 border-b items-center'>
                <img className="w-10 h-10 rounded-full" src={userImg ? userImg : 'https://i0.wp.com/digitalhealthskills.com/wp-content/uploads/2022/11/3da39-no-user-image-icon-27.png?fit=500%2C500&ssl=1'} alt="Imagem do usuário autor do poste" />
                <div className='flex flex-col'>
                    <span className='font-semibold'>{username}</span>
                    <span className='text-xs'>{moment(created_at).fromNow()}</span>
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
                <button onClick={() => {
                    setShowComment(!showComment)
                }} className='text-xl'>{data && data.length > 0 ? `${data.length} comentário${data.length > 1 ? "s" : ""}` : ""}</button>
            </div>
            <div className='flex justify-around py-4 text-gray-600 border-b'>
                <button className='flex items-center gap-1'><FaThumbsUp />Curtir</button>
                <button onClick={() => document.getElementById("comment" + id)?.focus()} className='flex items-center gap-1'><FaRegComment /> Comentar</button>
            </div>
            { }
            {showComment && data?.map((commentData, id) => {
                return <Comment comment={commentData} key={id} />
            })}
            <div className='flex gap-2 pt-6'>
                <img src={user?.userImg ? user.userImg : 'https://i0.wp.com/digitalhealthskills.com/wp-content/uploads/2022/11/3da39-no-user-image-icon-27.png?fit=500%2C500&ssl=1'}
                    alt="Imagem de pefil do usuário" className="w-12 h-12 rounded-full" />
                <div className='w-full bg-zinc-100 flex items-center text-gray-600 px-3 py-1 rounded-full'>
                    <input value={comment_desc} onChange={(e) => setComment_desc(e.target.value)} className='bg-zinc-100 w-full focus-visible:outline-none border-4 rounded-full px-3 mx-5' type="text" id={"comment" + id} placeholder='O que você achou?' />
                    <button onClick={() => shareComment()}>
                        <FaPaperPlane />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Post