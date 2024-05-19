import { UserContext } from "@/context/UserContext"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useContext, useState } from "react"
import { FaPaperPlane, FaRegComment, FaThumbsUp, FaUserFriends } from "react-icons/fa"
import { TbPhoto } from "react-icons/tb"
import { makeRequest } from "../../axios"

const SharePhotos = () => {

    const { user } = useContext(UserContext)

    const [post_desc, setDesc] = useState('');


    const [img, setImg] = useState<File | null>(null)

    const queryClient = useQueryClient() //Pegando o queryClient iniciado lá no layout
    const mutation = useMutation({
        mutationFn: async (newPost: {}) => {
            await makeRequest.post('post/', newPost).then((res) => {
                return res.data
            })
        }, onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["posts"] })
        }
    })

    return (
        <div className="w-1/3 bg-white rounded-lg p-4 shadow-md flex flex-col gap-3">
            {img && <img className='rounded-lg' src={URL.createObjectURL(img)} alt="Imagem do post" />}
            <div className='flex gap-2 pt-6'>
                <img src={user?.userImg ? user.userImg : 'https://i0.wp.com/digitalhealthskills.com/wp-content/uploads/2022/11/3da39-no-user-image-icon-27.png?fit=500%2C500&ssl=1'}
                    alt="Imagem de pefil do usuário" className="w-12 h-12 rounded-full" />
                <div className='w-full bg-zinc-100 flex items-center text-gray-600 px-3 py-1 rounded-full'>
                    <input
                        value={post_desc}
                        onChange={(e) => setDesc(e.target.value)}
                        className='bg-zinc-100 w-full focus-visible:outline-none border-4 rounded-full px-3 mx-5' type="text"
                        placeholder={`Compartilhe seus momentos, ${user?.username}!`} />
                    <button>
                        <FaPaperPlane onClick={() => mutation.mutate({ post_desc, userId: user?.id })} />
                    </button>
                </div>
            </div>
            <div className='flex justify-around py-4 text-gray-600 border-y'>
                <div>
                    <input onChange={(e) => setImg(e.target.files && e.target.files[0])} className='hidden' type="file" id="img" />
                    <label htmlFor="img" className="flex cursor-pointer">
                        <TbPhoto className="text-2xl mr-1" />
                        Adicionar imagem
                    </label>
                </div>
                <button className='flex items-center gap-1'><FaUserFriends className="text-2xl" /> Marcar amigo</button>
            </div>
        </div>
    )
}

export default SharePhotos