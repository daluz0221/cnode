const { http } = require('../plugins')

export const getPokemonNameById = async( id:string|number ):Promise<string> => {

    try {

        const url = `https://pokeapi.co/api/v2/pokemon/${ id }`;
        const pokemon = await http.get( url );
        return pokemon.name;
        
    } catch (err) {
        return `Pokemon no existe con id ${id}`
    }





    // return fetch( url )
    // .then( (response) => response.json() )
    // .then( () => { throw new Error("non che pokemon") } )
    // .then( ( pokemon ) => pokemon.name )

  
}
