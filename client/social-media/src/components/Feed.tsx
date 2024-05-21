import { useEffect, useState } from "react"
import Post from "./Post"
import { IPost } from "../app/interfaces/IPost";
import { makeRequest } from "../../axios";
import SharePhotos from "./SharePhotos";
import { useQuery } from "@tanstack/react-query";

const Feed = () => {

    const { data, isLoading, error } = useQuery<IPost[] | undefined>({
        queryKey: ["posts"],
        queryFn: () =>
            makeRequest.get("/post/").then((res) => {
                return res.data.data
            })
    })

    if (error) {
        console.log(error);
    }

    return (
        <div className="flex flex-col items-center gap-5 w-full">
            <SharePhotos />
            {isLoading ? <span>Carregando...</span> :
                <div className="w-full flex flex-col-reverse gap-5 items-center"> {data?.map((post, id) => {
                    return (
                        <Post post={post} key={id} />
                    )
                })}
                </div>
            }
        </div>
    )
}

export default Feed