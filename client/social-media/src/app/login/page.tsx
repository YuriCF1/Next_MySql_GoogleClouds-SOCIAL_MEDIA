import Link from 'next/link';
import imgFundo from '../../../public/images/fundo1.jpg';

const Login = () => {
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
            <h1 className='font-bold text-2x text-gray-700 text-2xl font-mono'>Login</h1>
            <div className='flex flex-col justify-between items-start'>
              <label htmlFor="email">Email:</label>
              <input className='border-gray-400 border-b w-full focus-visible:border-gray-900 focus-visible:border-b focus-visible:outline-none' type="text" name="" id="email" />
              <label htmlFor="password">Password:</label>
              <input className='border-gray-400 border-b w-full focus-visible:border-gray-900 focus-visible:border-b focus-visible:outline-none' type="password" name="" id="password" />
              <button className="bg-green-500 py-3 font-bold text-white rounded-lg hover:bg-green-800 mt-2 w-full">Entrar</button>
            </div>
            <div className='text-center underline text-blue-500 mt-2 text-sm sm:text-blue-100'>
              <Link href="/register" >Cadastrar-se</Link>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Login;
