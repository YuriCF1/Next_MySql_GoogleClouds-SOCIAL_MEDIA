import { useEffect, useState } from "react"
import Post from "./Post"
import { IPost } from "../app/interfaces/IPost";
import { makeRequest } from "../../axios";

const Feed = () => {

    const [posts, setPosts] = useState<IPost[] | undefined>(undefined);

    useEffect(() => {
        makeRequest.get("/post/").then((res) => {
            setPosts(res.data.data)
        }).catch((err) => {
            console.log(err);
        })
    }, [])

    return (
        <div className="flex flex-col items-center gap-5 w-full">
            {posts?.map((post, id) => {
                return (
                    <Post post={post} key={id} />
                )
            })}
        </div>
    )
}

export default Feed