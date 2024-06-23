const TestUser = () => {
    return (
        <div className="bg-green-200 flex flex-col rounded-md p-5 mt-3">
            <div className="text-2xs mb-4">
                <p>- If you don't want to create an account, just test the app {':)'}</p>
                <p>- Caso não queiras criar uma conta, apenas testar o aplicativo {':)'}</p>
            </div>
            <div className="flex flex-col">
                <h4 className="text-center">Test User</h4>
                <span>Email: user@test.com</span>
                <span>Password: 123456</span>
            </div>
        </div>
    )
}

export default TestUser