import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { makeRequest } from "../../axios"
import { useContext, useEffect } from "react"
import { UserContext } from "@/context/UserContext"
import IFriendship from "@/app/interfaces/IFriendship"
import Link from "next/link"

const FriendshipTable = () => {
    const queryClient = useQueryClient()

    const { user } = useContext(UserContext)

    const { data, error, isSuccess, isError } = useQuery({
        queryKey: ["friendship"], //Não precisa de id para diferenciar pois ela sempre retornará apenas de quem ta logado
        queryFn: () => makeRequest.get('/friendship/?fallower_id=' + user?.id)
            .then((res) => res.data.data),
        enabled: !!user?.id
    })

    if (error) {
        console.log(error);
    }

    const mutation = useMutation({
        mutationFn: async (unfallow: { fallower_id: number, fallowed_id: number, }) => {
            return makeRequest //Adicionar return é essencial para o funcionamento da onSuccess
                .delete(`friendship/?fallower_id=${unfallow.fallower_id}&fallowed_id=${unfallow.fallowed_id}`)
                .then((res) => {
                    return res.data.data
                })
        }, onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['friendship'] })
        }
    })

    return (
        <div className="w-1/6 mr-4 text-gray-600 flex flex-col gap-4">
            <span className="font-bold border-b-4 text-center">Seguindo</span>
            {data?.map((friend: IFriendship) => (
                <div key={friend.id} className="flex gap-2 items-center jsutify-between">
                    <Link href={`profile?id=${friend.fallowed_id}`} className="flex gap-2 items-center">
                        <img src={
                            friend.userImg
                                ? friend.userImg
                                : 'https://i0.wp.com/digitalhealthskills.com/wp-content/uploads/2022/11/3da39-no-user-image-icon-27.png?fit=500%2C500&ssl=1'}
                            alt="Imagem de pefil do usuário" className="w-12 h-12 rounded-full" />
                        <span className="font-bold">{friend.username}</span>
                    </Link>
                    <button onClick={() => user && mutation.mutate({ fallowed_id: friend.fallowed_id, fallower_id: user?.id })} className="px-2 py-1 bg-zinc-400 font-semibold rounded-md hover:text-black">Deixar de seguir</button>
                </div>
            ))}
        </div>
    )
}

export default FriendshipTable