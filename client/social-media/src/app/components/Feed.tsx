import Post from "./Post"

const Feed = () => {
    const posts = [{
        id: 1,
        post_desc: 'teste',
        img: 'https://images.unsplash.com/photo-1494500764479-0c8f2919a3d8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        username: 'user',
        userImg: ''
    }, {
        id: 2,
        post_desc: 'teste',
        img: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=2020&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        username: 'user',
        userImg: ''
    }]

    return (
        <div className="flex flex-col items-center ">
            {posts.map((post, id) => {
                return (
                    <Post post={post} key={id} />
                )
            })}
        </div>
    )
}

export default Feed