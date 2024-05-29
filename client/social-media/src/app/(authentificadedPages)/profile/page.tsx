'use client'

import { useQuery } from '@tanstack/react-query'
import { makeRequest } from "../../../../axios"
import Feed from '@/components/Feed'
import { IPost } from '@/app/interfaces/IPost'

const ProfilePage = ({ searchParams }: { searchParams: { id: string } }) => { //Altomaticamente já pega os parâmetros passados pela URL
    const profileQuery = useQuery({
        queryKey: ["profile", searchParams.id], //Diferenciando cada proefile pelos id's do usuário
        queryFn: () => makeRequest.get("users/get-user?id=" + searchParams.id)
            .then((res) => {
                return res.data[0]
            })
    })

    if (profileQuery.error) {
        console.log("Error profile", profileQuery.error);
    }

    const postQuery = useQuery<IPost[] | undefined>({
        queryKey: ["posts"],
        queryFn: () =>
            makeRequest.get("/post/?id=" + searchParams.id).then((res) => {
                return res.data.data
            })
    })

    if (postQuery.error) {
        console.log(postQuery.error);
    }

    return (
        <div className="w-1/2 flex flex-col items-center">
            <div className='relative'>
                <img className='rounded-xl' src={profileQuery.data?.bgImg ? profileQuery.data.bgImg : 'https://images.unsplash.com/photo-1487700160041-babef9c3cb55?q=80&w=2052&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}
                    alt="Imagem de fundo do usuário" />
                <div className='flex absolute bottom-[-110px] left-10 items-center'>
                    <img className='w-40 h-40 rounded-full border-zinc-100 border-4' src={profileQuery.data?.userImg ? profileQuery.data.userImg : 'https://i0.wp.com/digitalhealthskills.com/wp-content/uploads/2022/11/3da39-no-user-image-icon-27.png?fit=500%2C500&ssl=1'}
                        alt="Imagem de pefil do usuár io" />
                    <span className='text-2xl font-bold pl-2'>{profileQuery.data?.username}</span>
                </div>
            </div>
            <div className='pt-36 w-full'>
                <Feed post={postQuery.data} />
            </div>
        </div>
    )
}

export default ProfilePage