import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import ClientProviders from "../components/ClientProvieder";
import { UserContextProvider } from "@/context/UserContext";
/*
é uma biblioteca popular para o gerenciamento de estados assíncronos em aplicações React. 
Ela facilita a busca, cache, sincronização e atualização de dados em aplicações React, 
especialmente em casos de integração com APIs.
*/

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Photoshar",
  description: "A melhor rede social",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <ClientProviders>
          <UserContextProvider>
            {children}
          </UserContextProvider>
        </ClientProviders>
      </body>
    </html>
  );
}
