'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { makeRequest } from "../../../../axios"
import Feed from '@/components/Feed'
import { IPost } from '@/app/interfaces/IPost'
import { useContext, useState } from 'react'
import { UserContext } from '@/context/UserContext'
import IFriendship from '@/app/interfaces/IFriendship'

import { FaTimesCircle } from "react-icons/fa" //fa = font-awesome
import AuthInput from '@/components/AuthInput'
import IUser from '@/app/interfaces/IUser'

const ProfilePage = ({ searchParams }: { searchParams: { id: string } }) => { //Altomaticamente já pega os parâmetros passados pela URL
    const { user, setUser } = useContext(UserContext)

    //EDITING PROFILE
    const [username, setUsername] = useState<string>('');
    const [userImg, setUserImg] = useState<string>('');
    const [bgImg, setBgImg] = useState<string>('');
    const [editProfile, setEditProfile] = useState(false)

    //GETTING FIRST INFOS
    const queryClient = useQueryClient()
    const [fallowedState, setFallowedState] = useState(Boolean)

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
                    } else {
                        setFallowedState(false)
                    }
                })
                return res.data.data
            }),
        enabled: !!user?.id
    })

    if (friendshipQuery.error) {
        console.log(friendshipQuery.error);
    }

    const friendsMutation = useMutation({
        mutationFn: async (unfallow: { fallowedState: boolean, fallower_id: number, fallowed_id: number }) => {
            if (fallowedState) {
                setFallowedState(false)
                return await makeRequest //Adicionar return é essencial para o funcionamento da onSuccess
                    .delete(`friendship/?fallower_id=${unfallow.fallower_id}&fallowed_id=${unfallow.fallowed_id}`)
                    .then((res) => {
                        return res.data.data
                    })
            } else if (!fallowedState) {
                console.log('Tetando seguir', fallowedState, unfallow.fallowed_id);
                setFallowedState(true)
                return await makeRequest
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

    const editProfileMutation = useMutation({
        mutationFn: async (data: {
            username: string, userImg: string, bgImg: string, id: number
        }) => {
            return await makeRequest
                .put(`users/update-user`, data)
                .then((res) => {
                    const newUser: IUser = {
                        id: +searchParams.id,
                        userImg: data.userImg,
                        bgImg: data.bgImg,
                        username: data.username,
                    }
                    setUser(newUser) //Mandando para o Context
                    return res.data
                })
        }, onSuccess: () => {
            setEditProfile(false)
            queryClient.invalidateQueries({ queryKey: ["profile", searchParams.id], })
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
                    {/* Passando um + na frente, transforma o string em número */}
                    {user?.id != +searchParams.id ?
                        <button onClick={() => user && friendsMutation.mutate({ fallowedState, fallowed_id: +searchParams.id, fallower_id: user?.id })}
                            className={`w-56 py-2 font-semibold rounded-md ml-48
                                ${fallowedState ?
                                    'w-1/2 py-2 font-semibold rounded-md bg-zinc-400 hover:text-black'
                                    : 'bg-green-600 text-white hover:bg-green700'}`}>{fallowedState ? 'Deixar de seguir' : 'Seguir'}</button>
                        :
                        <button onClick={() => { setEditProfile(true)}} className='w-56 py-2 font-semibold rounded-md ml-48 bg-zinc-400 hover:text-black'>
                            Editar perfil
                        </button>
                    }
                </div>
            </div>
            {/* EDIT PROFILE*/}
            {editProfile &&
                <div className='fixed top-0 bottom-0 right-0 left-0 bg-[#00000094] z-10 flex items-center justify-center'>
                    <div className='bg-white w-2/3 rounded-xl flex flex-col items-center'>
                        <header className='w-full border-b font-semibold text-lg text-zinc-600 flex justify-between items-center p-2'>Editar perfil
                            <button onClick={() => { setEditProfile(false) }} ><FaTimesCircle className='text-red-600 text-4xl' /></button>
                        </header>
                        <form className='w-2/3 py-8 flex flex-col gap-8'>
                            <AuthInput label='Nome:' newState={setUsername} value={username}></AuthInput>
                            <AuthInput label='Imagem de fundo' newState={setBgImg} autoComplete={false} value={bgImg}></AuthInput>
                            <AuthInput label='Imagem do perfil' newState={setUserImg} autoComplete={false} value={userImg}></AuthInput>
                        </form>
                        <button
                            onClick={(e) => {
                                setEditProfile(false);
                                e.preventDefault();
                                editProfileMutation.mutate({
                                    username: username as string,
                                    userImg: userImg as string,
                                    bgImg: bgImg as string,
                                    id: +searchParams.id
                                })
                            }}
                            className='w-2/5 h-12 mb-6 rounded-md font-semibold bg-zinc-300 hover:text-black self-center'
                        >
                            Editar perfil
                        </button>
                    </div>
                </div>
            }
            <div className='pt-36 w-full'>
                <Feed post={postQuery.data} />
            </div>
        </div >
    )
}

export default ProfilePage
