
interface User {
    id: number;
    name: string;
}

const users:User[] = [
    {
        id: 1,
        name: 'john doe'
    },
    {
        id:2,
        name: 'jane doe'
    }

]


export const getUserByID = (id: number, callback: (err?: string, user?:User)=>void ) =>{
    const user = users.find( user =>{
        return user.id === id
    } )

    if (!user) {
        return callback(`User not found with id ${id}`);
    }

    return callback(undefined, user)
    

}


