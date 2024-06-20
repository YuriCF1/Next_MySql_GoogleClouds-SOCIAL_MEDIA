import IComment from "@/app/interfaces/IComent"

import moment from "moment"
// import "moment/locale/pt-BR"

const Comment = (props: { comment: IComment }) => {
    const { comment_desc, userImg, username, created_at } = props.comment

    return (
        <div className="mt-6 flex gap-2 border-b-2">
            <img className="w-10 h-10 rounded-full"
                src={userImg ? userImg :
                    'https://i0.wp.com/digitalhealthskills.com/wp-content/uploads/2022/11/3da39-no-user-image-icon-27.png?fit=500%2C500&ssl=1'}
                alt="Imagem do usuário autor do comentário" />
            <div className="text-zinc-600 w-full">
                <div className="flex flex-col bg-zinc-200 px-4 py-1 rounded-md">
                    <span className="font-semibold">{username}</span>
                    <span className="text-xl">{comment_desc}</span>
                </div>
                <span className="text-xs">{moment(created_at).fromNow()}</span>
            </div>
        </div>
    )
}

export default Comment