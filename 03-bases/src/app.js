
// // const templateExports = require('./js-fundation/01-template')
// // const destructuring = require('./js-fundation/02.destructuring')
// const { getAge, getUUID } = require("./plugins")

// // const { getUserByID } = require("./js-fundation/03-callbacks")


// // const id = 3

// // getUserByID(id, function(err, user){
// //     if (err) {
// //         throw new Error(err)
// //     }

// //     console.log(user);
    
// // })

// const { buildMakePerson } = require('./js-fundation/05-factory')

// const makePerson = buildMakePerson( getUUID, getAge ) --> inyección de dependencias


// const obj = {
//     name: 'john doe', bithdate:'1996-02-21'
// }

// const john = makePerson( obj );

// console.log({ john });




// const getPokemonById = require("./js-fundation/06-pŕomises");

// const name = getPokemonById(6);

// name.then( ( poemon ) => console.log(poemon))
// .catch( ( err ) => console.log(err) )
// .finally( ( pokemon ) => console.log("listo") )


const { buildLogger } = require("./plugins")

const logger = buildLogger('app.js')

logger.log("Hola mundo");
logger.error("Este es un fallo");









