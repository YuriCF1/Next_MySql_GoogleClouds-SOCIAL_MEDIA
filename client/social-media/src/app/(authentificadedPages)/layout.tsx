'use client'

import { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "@/../../axios";
import SideBar from "@/components/SideBar";
import Header from "@/components/Header";
import FriendshipTable from "@/components/FriendshipTable";

export default function MainHome({ children }: { children: ReactNode }) {
    const router = useRouter()

    const { data, error, isSuccess, isError } = useQuery({
        queryKey: ["refresh"], //Guarda em cache as informações da requisição, caso não haja mudança nos dados
        queryFn: () => makeRequest.get("auth/refresh").then(res => {
            return res.data
        }),
        retry: false, //Se retornar um erro, ela tenta cerca de 5 vezes por padrão. Posso passar um número também. Mas não quero que ela tente de novo
        refetchInterval: 60 * 50 * 1000 // A cada certo tempo, ele vai fazer essa requisição. 60seg x 50min x 1seg = 50min => 10min a menos da duração do token
        //Portanto, vai renovar o token antes que ele expire
    })

    if (isSuccess) {
        console.log("Refresh success?", data.msg);
    }

    if (isError) {
        console.log(error);
        router.push('./login')
    }

    return (
        <main className="flex flex-col items-center justify-between bg-white">
            <Header />
            <div className="w-full flex justify-start pt-20">
                <SideBar />
                <div className="w-full justify-center flex pb-10">
                    {children}
                </div>
                <FriendshipTable />
            </div>
        </main>
    );
}
