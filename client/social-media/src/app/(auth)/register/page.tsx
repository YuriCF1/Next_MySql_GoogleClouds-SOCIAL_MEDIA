'use client'

import { useEffect, useState } from "react";
import AuthInput from "../../../components/AuthInput"
import AuthPage from "../layout"
import Link from "next/link";
import AuthButton from "../../../components/AuthButton";
import { makeRequest } from "../../../../axios";

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const [isFormValid, setIsFormValid] = useState(false);

    const handleRegister = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        //Pegando URL base de um arquivo externo 
        makeRequest.post('uth/register', { username, email, password, confirmPassword })
            .then((res) => {
                console.log(res.data)
                setSuccess('Usuário registrado com sucesso!');
                setError('')
            })
            .catch((err) => {
                setError(err.response.data.msg)
                console.log(error);
            })
    }

    useEffect(() => {
        if (username !== '' && email !== '' && password !== '' && confirmPassword !== '') {
            setIsFormValid(true);
        } else {
            setIsFormValid(false);
        }
    }, [username, email, password, confirmPassword]);

    return (
        // <AuthPage>
        //O que era o Componente AuthPage, agora é o layout dentro da pasta (auth). Que considera auth como uma rota, 
        // ignorando a palavra na URL e utilizando o arquivo layout dentro da mesma como componente pai para englobar as rotas filhas
        <>
            <h1 className='font-bold text-2x text-gray-700 text-2xl font-mono'>Cadastro</h1>
            <AuthInput label='Nome' newState={setUsername}></AuthInput>
            <AuthInput label='Email' newState={setEmail}></AuthInput>
            <AuthInput label='Senha' newState={setPassword} isPassword></AuthInput>
            <AuthInput label='Confirme sua senha' newState={setConfirmPassword} isPassword></AuthInput>
            <AuthButton texto="Registrar" isFormValid={isFormValid} handleFunction={handleRegister} />
            <div className='text-center underline text-blue-500 mt-2 text-sm sm:text-blue-100'>
                <Link href="/login" >Logar</Link>
            </div>
            {error.length > 1 && <span className="text-red-700 mt-2">* {error}</span>}
            {success && <span className="text-green-700 mt-2">* {success}</span>}
        </>
        // </AuthPage>
    )
}

export default Register