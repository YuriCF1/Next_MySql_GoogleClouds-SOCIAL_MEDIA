const TestUser = () => {
    return (
        <div className="bg-red-200 flex flex-col rounded-md p-5 mt-3">
            <p>- AWS started to send me bills because of the public IP that i was using in the RDS, so unfortunally i had to turn off the server...
                But I{`'`}m searching other free solution for it!</p>
            <p>- A AWS começou a me cobrar em dólares pelo IP público que eu estava usando para conectar com a RDS... então infelizmente tive que fechar o servidor.
                Porém estou buscando uma maneira gratuíta para hospedá-lo!
            </p>
            {/* <div className="text-2xs mb-4">
                <p>- If you don{`'`}t want to create an account, just test the app {`:)`}</p>
                <p>- Caso não queiras criar uma conta, apenas testar o aplicativo {`:)`}</p>
            </div>
            <div className="flex flex-col">
                <h4 className="text-center">Test User</h4>
                <span>Email: user@test.com</span>
                <span>Password: 123456</span>
            </div> */}
        </div>
    )
}

export default TestUser