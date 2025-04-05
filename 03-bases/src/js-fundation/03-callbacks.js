const users = [
    {
        id: 1,
        name: 'john doe'
    },
    {
        id:2,
        name: 'jane doe'
    }

]


const getUserByID = (id, callback ) =>{
    const user = users.find( user =>{
        return user.id === id
    } )

    if (!user) {
        return callback(`User not found with id ${id}`);
    }

    return callback(null, user)
    

}

module.exports = {
    getUserByID
}

