

// const makeBuildPerson = () => {
  
//     return () => {
      

//         return {

//         }
//     }

// }


const buildMakePerson = (getUUID, getAge) => {
    return ({name, bithdate}) => {
  
        return {
            id: getUUID(),
            name,
            bithdate,
            age: getAge( bithdate )
        }
    
    }
}





// const john = buildPerson( obj )

// console.log(john);

module.exports = {
    buildMakePerson
}
