"use client"
import Link from 'next/link'

import Comment from './Comment'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useContext, useState } from 'react'
import { UserContext } from '@/context/UserContext'

import { FaThumbsUp, FaRegComment, FaPaperPlane } from 'react-icons/fa'

import { IPost } from '../app/interfaces/IPost'
import IComment from '@/app/interfaces/IComent'
import ILike from '@/app/interfaces/ILike'

import moment from 'moment'
// import "moment/locale/pt-br"
import { makeRequest } from '../../axios'

const Post = (props: { post: IPost }) => {
    const { post_desc, img, username, userImg, created_at, id, userId } = props.post
    const { user } = useContext(UserContext)
    const queryCLient = useQueryClient()

    const [liked, setLiked] = useState(false)
    const [showWhoLiked, setShowWhoLIked] = useState(false)

    const [comment_desc, setComment_desc] = useState("")
    const [showComment, setShowComment] = useState(false)

    /*
    React Query usa essa chave para armazenar e buscar dados no cache. Se você já buscou comentários para o post 1, esses dados serão armazenados sob a 
    chave ["comments", 1]. Ao fazer a mesma consulta novamente, os dados cacheados serão usados em vez de fazer uma nova requisição.
    */

    //_______________________________________LIKES: QUERY | MUTATION_______________________________________
    const likesQuery = useQuery<ILike[] | undefined>({
        queryKey: ["likes", id], // Colocando o 'id' para fazer uma query diferente para cada post.
        queryFn: () => makeRequest.get("likes/?likes_post_id=" + id).then((res) => {
            const likes = res.data.data
            const userLiked = likes.some((like: ILike) => like.likes_user_id === user?.id)
            setLiked(userLiked)
            return likes
        }),
        enabled: !!id // Só ativa a query quando tiver o parâmetro id
    })


    if (likesQuery.error) {
        console.log(likesQuery.error);
    }

    const LikesMutation = useMutation({
        mutationFn: async (newLike: {}) => {
            if (liked) {
                await makeRequest.delete(`likes/?likes_post_id=${id}&likes_user_id=${user?.id}`, newLike).then((res) => {
                    setLiked(false)
                    return res.data.data

                })
            } else {
                await makeRequest.post("likes/", newLike).then((res) => {
                    setLiked(true)
                    return res.data.data
                })
            }
        },
        onSuccess: () => {
            //Fazendo o reset da queryKey, para toda vez que fiver um comentário novo, ele refaz a query
            queryCLient.invalidateQueries({ queryKey: ["likes", id] })
        }
    })

    const addLike = async () => {
        LikesMutation.mutate({
            likes_user_id:
                user?.id,
            likes_post_id: id
        })
    }


    //_______________________________________COMENTÁRIO: QUERY | MUTATION_______________________________________
    // const { data, error, isLoading } = useQuery<IComment[] | undefined>({
    const commentQuery = useQuery<IComment[] | undefined>({
        queryKey: ["comments", id],//Colocando o 'id' para fazer uma query diferente para cada post. Colocando id para dizer que tem uma KEY para cada post
        queryFn: () => makeRequest.get("comments/?post_id=" + id).then((res) => {
            return res.data.data
        }),
        enabled: !!id //Só ativa a query quando tiver o parâmetro id
    })

    if (commentQuery.error) {
        console.log(commentQuery.error);
    }

    const Coomentsmutation = useMutation({
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
        Coomentsmutation.mutate({ comment_desc, comment_user_id: user?.id, post_id: id })
        setComment_desc('')
    }

    const imgSrc = img && img.includes("://") ? img : `./upload/${img}`

    return (
        <div className='w-full bg-zinc-100 rounded-lg p-4 shadow-2xl m-1'>
            <header className='flex gap-2 pb-4 border-b items-center'>
                <Link href={`profile/?id=${userId}`}>
                    <img className="w-10 h-10 rounded-full" src={userImg ? userImg : 'https://i0.wp.com/digitalhealthskills.com/wp-content/uploads/2022/11/3da39-no-user-image-icon-27.png?fit=500%2C500&ssl=1'} alt="Imagem do usuário autor do poste" />
                </Link>
                <div className='flex flex-col'>
                    <Link href={`profile/?id=${userId}`}>  <span className='font-semibold'>{username}</span></Link>
                    <span className='text-xs'>{moment(created_at).fromNow()}</span>
                </div>
            </header>
            {post_desc && (
                <div className='py-4 w-full'>
                    <span>{post_desc}</span>
                </div>)}
            {img && <img className='rounded-lg' src={imgSrc} alt="Imagem do post" />}
            <div className='border-b'>
                <div className='flex justify-between py-4 h-16'>
                    <div
                        className='relative'
                        onMouseEnter={() => setShowWhoLIked(true)}
                        onMouseLeave={() => setShowWhoLIked(false)}>
                        {likesQuery.data && likesQuery.data.length > 0 && (
                            <>
                                <div className='flex gap-1 items-center'>
                                    <span className='bg-blue-500 text-white w-8 h-8 p-2 items-center flex justify-center rounded-full text-2xl'>
                                        <FaThumbsUp />
                                    </span>
                                    <span className='text-2xl'>{likesQuery.data.length}</span>
                                </div>
                                {showWhoLiked && (
                                    <div className='absoulute bg-white border flex flex-col p-2 rounded-md top-10'>
                                        {likesQuery.data.map((like) => {
                                            return <span key={like.id}>{like.username}</span>
                                        })}
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                    <button
                        onClick={() => {
                            setShowComment(!showComment)
                        }} className='text-[125%]'>{commentQuery.data && commentQuery.data.length > 0 ? `${commentQuery.data.length} comentário${commentQuery.data.length > 1 ? "s" : ""}` : ""}
                    </button>
                </div>
            </div>
            <div className='flex justify-around py-4 text-gray-600 border-b'>
                <button
                    className={`flex items-center gap-1 ${liked ? "text-blue-600" : " "}`}
                    onClick={() => addLike()}
                >
                    <FaThumbsUp className=' mr-1' />Curtir</button>
                <button onClick={() => document.getElementById("comment" + id)?.focus()} className='flex items-center gap-1'><FaRegComment /> Comentar</button>
            </div>
            {showComment && commentQuery.data?.map((commentData, id) => {
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