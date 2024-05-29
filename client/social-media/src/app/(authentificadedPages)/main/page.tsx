'use client'

import { IPost } from "@/app/interfaces/IPost"
import Feed from "@/components/Feed"
import SharePhotos from "@/components/SharePhotos"
import { useQuery } from "@tanstack/react-query"
import { makeRequest } from "../../../../axios"

const Main = () => {

    const postQuery = useQuery<IPost[] | undefined>({
        queryKey: ["posts"],
        queryFn: () =>
            makeRequest.get("/post/").then((res) => {
                return res.data.data
            })
    })

    return (
        <div className="w-1/2">
            <SharePhotos />
            <Feed post={postQuery.data} />
        </div>
    )
}

export default Main