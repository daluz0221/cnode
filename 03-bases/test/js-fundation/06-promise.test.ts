import { getPokemonNameById } from "../../src/js-fundation/06-pŕomises";


describe('06-promises', () => {
  

    test('getPokemonNameById should return a pokemon', async () => {
      
        const pokemonId = 1;
        const pokemonName = await getPokemonNameById( pokemonId );

        expect( pokemonName ).toBe('bulbasaur')

    });

    test('should return an error if pokemon does not exist', async() => {
      const pokemonId = 1000000000;
       const pokemonName = await getPokemonNameById( pokemonId );

       expect( pokemonName ).toBe(`Pokemon no existe con id ${pokemonId}`)

    });



});