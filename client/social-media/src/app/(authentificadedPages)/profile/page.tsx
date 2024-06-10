'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { makeRequest } from "../../../../axios"
import Feed from '@/components/Feed'
import { IPost } from '@/app/interfaces/IPost'
import { useContext, useState } from 'react'
import { UserContext } from '@/context/UserContext'
import IFriendship from '@/app/interfaces/IFriendship'

const ProfilePage = ({ searchParams }: { searchParams: { id: string } }) => { //Altomaticamente já pega os parâmetros passados pela URL
    const { user } = useContext(UserContext)
    const queryClient = useQueryClient()
    const [fallowedState, setFallowedState] = useState(false)

    const profileQuery = useQuery({
        queryKey: ["profile", searchParams.id], //Diferenciando cada proefile pelos id's do usuário
        queryFn: () => makeRequest.get("users/get-user?id=" + searchParams.id)
            .then((res) => {
                return res.data[0]
            })
    })

    const postQuery = useQuery<IPost[] | undefined>({
        queryKey: ["posts"],
        queryFn: () =>
            makeRequest.get("/post/?id=" + searchParams.id).then((res) => {
                return res.data.data
            })
    })

    if (profileQuery.error) {
        console.log("Error profile", profileQuery.error);
    }

    if (postQuery.error) {
        console.log(postQuery.error);
    }

    const friendshipQuery = useQuery({
        queryKey: ["friendship"], //Não precisa de id para diferenciar pois ela sempre retornará apenas de quem ta logado
        queryFn: () => makeRequest.get('/friendship/?fallower_id=' + user?.id)
            .then((res) => {
                res.data.data.find((e: IFriendship) => {
                    console.log(e);
                    if (e.fallowed_id === +searchParams.id) { //Verificando se algum resultado terá o id do usuário, então quer dizer que ele já estará seguindo
                        setFallowedState(true)
                        console.log('Sigo?', fallowedState);
                    }
                })
                return res.data.data
            }),
        enabled: !!user?.id
    })

    if (friendshipQuery.error) {
        console.log(friendshipQuery.error);
    }

    const mutation = useMutation({
        mutationFn: async (unfallow: { fallowedState: boolean, fallower_id: number, fallowed_id: number }) => {
            if (fallowedState) {
                return makeRequest //Adicionar return é essencial para o funcionamento da onSuccess
                    .delete(`friendship/?fallower_id=${unfallow.fallower_id}&fallowed_id=${unfallow.fallowed_id}`)
                    .then((res) => {
                        setFallowedState(false)
                        return res.data.data
                    })
            } else {
                console.log('Tetando seguir', fallowedState, unfallow.fallowed_id);
                setFallowedState(true)
                return makeRequest
                    // .post(`friendship/}`, { fallower_id: unfallow.fallower_id, fallowed_id: unfallow.fallowed_id })
                    .post(`friendship/`, { fallower_id: user?.id, fallowed_id: searchParams.id })
                    .then((res) => {
                        return res.data.data
                    })
            }
        }, onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['friendship'] })
        }
    })

    return (
        <div className="w-1/2 flex flex-col items-center">
            <div className='relative'>
                <img className='rounded-xl' src={profileQuery.data?.bgImg ? profileQuery.data.bgImg : 'https://images.unsplash.com/photo-1487700160041-babef9c3cb55?q=80&w=2052&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}
                    alt="Imagem de fundo do usuário" />
                <div className='flex absolute bottom-[-110px] left-10 items-center'>
                    <img className='w-40 h-40 rounded-full border-zinc-100 border-4' src={profileQuery.data?.userImg ? profileQuery.data.userImg : 'https://i0.wp.com/digitalhealthskills.com/wp-content/uploads/2022/11/3da39-no-user-image-icon-27.png?fit=500%2C500&ssl=1'}
                        alt="Imagem de pefil do usuár io" />
                    <span className='text-2xl font-bold pl-2'>{profileQuery.data?.username}</span>
                    {user?.id != +searchParams.id &&
                        <button onClick={() => user && mutation.mutate({ fallowedState, fallowed_id: +searchParams.id, fallower_id: user?.id })}
                            className={`w-56 py-2 font-semibold rounded-md ml-48
                                ${fallowedState ?
                                    'w-1/2 py-2 font-semibold rounded-md bg-zinc-400 hover:text-black'
                                    : 'bg-green-600 text-white hover:bg-green700'}`}>{fallowedState ? 'Deixar de seguir' : 'Seguir'}</button>
                    }
                </div>
            </div>
            {/* Passando um + na frente, transforma o string em número */}
            <div className='pt-36 w-full'>
                <Feed post={postQuery.data} />
            </div>
        </div>
    )
}

export default ProfilePage