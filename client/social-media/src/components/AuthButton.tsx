interface AuthButtonProps {
    texto: string;
    isFormValid: boolean;
    handleFunction: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const AuthButton: React.FC<AuthButtonProps> = ({ texto, isFormValid, handleFunction }) => {
    return (
        <button disabled={!isFormValid} onClick={handleFunction} className={`bg-green-500 py-3 font-bold text-white rounded-lg hover:bg-green-800 mt-2 w-full ${!isFormValid && 'opacity-50 cursor-not-allowed'}`}>{texto}</button>
    )
}

export default AuthButton