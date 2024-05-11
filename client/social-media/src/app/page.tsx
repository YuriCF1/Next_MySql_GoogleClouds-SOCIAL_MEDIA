'use client'

import Image from "next/image";
import Header from "./components/Header";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import SideBar from "./components/SideBar";
import Feed from "./components/Feed";

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    let value = localStorage.getItem('rede-social:token');
    if (!value) {
      router.push('./login')
    }
  }, [])

  return (
    <main className="flex flex-col items-center justify-between bg-white">
      <Header />
      <div className="w-full flex justify-start pt-10">
        <SideBar />
        <Feed />
      </div>
    </main>
  );
}
