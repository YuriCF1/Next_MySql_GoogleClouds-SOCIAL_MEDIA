import { useQuery } from "@tanstack/react-query"
import { makeRequest } from "../../axios"
import { useContext } from "react"
import { UserContext } from "@/context/UserContext"

const FriendshipTable = () => {
    const { user } = useContext(UserContext)

    const { data, error } = useQuery({
        queryKey: ["friendship"], //Não precisa de id para diferenciar pois ela sempre retornará apenas de quem ta logado
        queryFn: () => makeRequest.get('/friendship/?fallowed_id')
    })

    if (error) {
        console.log(error);
    }

    console.log(data);

    return (
        <div>
            <span>Seguindo</span>
        </div>
    )
}

export default FriendshipTable