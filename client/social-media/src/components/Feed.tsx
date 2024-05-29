"use client"
/*NOTA: Usar 'use client' impede o erro: Error: (0 , _tanstack_react_query__WEBPACK_IMPORTED_MODULE_4__.useQuery) is not a function. Pois ele nem considera a possibilidade de ser uma função dinãmica*/
import Post from "./Post"
import { IPost } from "../app/interfaces/IPost";

const Feed = (props: { post: IPost[] | undefined }) => {
    return (
        <div className="flex flex-col items-center gap-5 w-full">
            <div className="w-full flex flex-col gap-5 items-center"> {props.post?.map((post, id) => {
                return (
                    <Post post={post} key={id} />
                )
            })}
            </div>
        </div>
    )
}

export default Feed