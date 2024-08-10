const TestUser = () => {
    return (
        // <div className="bg-blue-200 flex flex-col rounded-md p-5 mt-3">
        <div className="bg-red-200 flex flex-col rounded-md p-5 mt-3">
            {/* <div className="bg-red-200 flex flex-col rounded-md p-5 mt-3">
                <p>- AWS started to send me bills because of the public IP that i was using in the RDS. So i changed to Google Cloud but they stoped to offer Cloud SQL in Free Tier. So unfortunally i had to turn off the server...
                    But I{`'`}m searching other free solution for it!</p>
                <p>- A AWS começou a me cobrar em dólares pelo IP público que eu estava usando para conectar com a RDS... Daí migrei para a Google Cloud, mas eles pararam de oferecer o Cloud SQL no nível grauito... então infelizmente tive que fechar o servidor.
                    Porém estou buscando uma maneira gratuíta para hospedá-lo!
                </p>
            </div> */}
            <div className="text-2xs mb-4">
                <p className="mt-2 text-sm"><b>ENGLISH:</b> This backend server, previously hosted on Google Cloud's Compute Engine, has been taken offline as of October 2024 to avoid unnecessary costs. However, the backend code and implementation details remain available for review. Feel free to explore how I built the connections and structured the backend on my GitHub repository <a href="https://github.com/YuriCF1/Next_MySql_GoogleClouds-SOCIAL_MEDIA/tree/main/api" className="text-blue-700">here</a>.</p>
                <p className="mt-2 text-sm"><b>PORTUGUÊS:</b> Este servidor backend, anteriormente hospedado no Compute Engine da Google Cloud, foi desativado em outubro de 2024 para evitar custos desnecessários. No entanto, o código do backend e os detalhes da implementação continuam disponíveis para consulta. Fique à vontade para conferir como fiz as conexões e estruturei o backend no meu repositório do GitHub <a href="https://github.com/YuriCF1/Next_MySql_GoogleClouds-SOCIAL_MEDIA/tree/main/api" className="text-blue-700">aqui</a>.</p>
                {/* <p>- If you don{`'`}t want to create an account, just test the app {`:)`}</p>
                <p>- Caso não queiras criar uma conta, apenas testar o aplicativo {`:)`}</p> */}
            </div>
            {/* <div className="flex flex-col">
                <h4 className="text-center">Test User</h4>
                <span>Email: test@email.com</span>
                <span>Password: iwouldlovetohelpyourteam</span>
            </div> */}
        </div>
    )
}

export default TestUser