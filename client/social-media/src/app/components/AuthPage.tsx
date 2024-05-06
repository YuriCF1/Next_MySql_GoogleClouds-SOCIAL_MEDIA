import { ReactNode } from 'react'
import imgFundo from '../../../public/images/fundo1.jpg'

const AuthPage = ({ children }: { children: React.ReactNode }) => {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center relative">
            <div className="absolute inset-0 bg-no-repeat bg-cover bg-center sm:bg-left"
                style={{
                    backgroundImage: `url(${imgFundo.src})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center 70%",
                    filter: "brightness(60%) contrast(90%)",
                }}>
            </div>
            <div className="z-10 h-screen flex items-center justify-center">
                <div className='flex flex-col bg-white px-6 py-9 rounded-2xl gap-9 text-gray-600 w-96 h-fit'>
                    <form action="">
                        {children}
                    </form>
                </div>
            </div>
        </main>
    )
}

export default AuthPage