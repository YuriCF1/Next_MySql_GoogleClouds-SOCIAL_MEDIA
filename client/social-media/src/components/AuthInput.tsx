interface AuthInputProps {
    newState: (state: string) => void,
    label: string,
    isPassword?: boolean,
    autoComplete?: false
}

const AuthInput = (props: AuthInputProps) => {
    return (
        <div className='flex flex-col justify-between items-start mt-2'>
            <label>{props.label}</label>
            <input onChange={(e) => { props.newState(e.currentTarget.value) }} className='border-gray-400 border-b w-full focus-visible:border-gray-900 focus-visible:border-b focus-visible:outline-none' type={props.isPassword ? 'password' : 'text'} name="" autoComplete={props.autoComplete ? 'on' : 'off'} />
        </div>
    )
}

export default AuthInput