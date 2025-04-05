
// const templateExports = require('./js-fundation/01-template')
// const destructuring = require('./js-fundation/02.destructuring')
const { getAge, getUUID } = require("./plugins")

// const { getUserByID } = require("./js-fundation/03-callbacks")


// const id = 3

// getUserByID(id, function(err, user){
//     if (err) {
//         throw new Error(err)
//     }

//     console.log(user);
    
// })

const { buildMakePerson } = require('./js-fundation/05-factory')

const makePerson = buildMakePerson( getUUID, getAge )


const obj = {
    name: 'john doe', bithdate:'1996-02-21'
}

const john = makePerson( obj );

console.log({ john });
