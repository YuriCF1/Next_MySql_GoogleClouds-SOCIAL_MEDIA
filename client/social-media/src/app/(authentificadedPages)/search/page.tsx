'use client'

import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../../../axios";
import IUser from "@/app/interfaces/IUser";
import Link from "next/link";
import Post from "@/components/Post";
import { IPost } from "@/app/interfaces/IPost";

const Search = ({ searchParams }: { searchParams: { params: string } }) => { //SearchParams aparenta ser uma palavra reservada, tem que 

  const usersFound = useQuery({
    queryKey: ['searchUsers', searchParams],
    queryFn: async () => {
      const res = await makeRequest.get('search/search-users?params=' + searchParams.params);
      return res.data;
    },
    enabled: !!searchParams?.params
  })

  if (usersFound.error) {
    console.log(usersFound.error);
  }

  const postsFound = useQuery({
    queryKey: ['searchPosts', searchParams],
    queryFn: async () => {
      const res = await makeRequest.get('search/search-posts?params=' + searchParams.params);
      console.log('DATA:', res.data);
      return res.data;
    },
    enabled: !!searchParams?.params
  })

  if (postsFound.error) {
    console.log(postsFound.error);
  }

  return (
    <div className="w-[60%] flex gap-6">
      <div className="flex flex-col gap-8 w-1/3 border-r p-4 items-center">
        <span className="font-semibold text-lg">Usuários</span>
        {usersFound.data?.map((user: IUser, id: number) => {
          return (
            <div className='w-full bg-zinc-100 rounded-lg p-4 shadow-2xl m-1' key={id}>
              <Link href={'/profile?id=' + user?.id} key={id} className="flex items-center gap-2 py-2 border-b border-stone-200">
                <img src={
                  user.userImg
                    ? user.userImg
                    : 'https://i0.wp.com/digitalhealthskills.com/wp-content/uploads/2022/11/3da39-no-user-image-icon-27.png?fit=500%2C500&ssl=1'}
                  alt="Imagem de pefil do usuário" className="w-12 h-12 rounded-full" />
                <span className="font-bold">{user.username}</span>
              </Link>
            </div>
          )
        })}
      </div>
      <div className="flex flex-col gap-8 w-1/3 border-r p-4 items-center">
        <span className="font-semibold text-lg">Posts</span>
        {postsFound.data?.map((post: IPost, id: number) => {
          return (
            <>
              <Post key={id} post={post} />
            </>
          )
        })
        }
      </div>
    </div>
  )
}

export default Search