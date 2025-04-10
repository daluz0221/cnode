import { buildMakePerson } from "../../src/js-fundation/05-factory";


describe('05-factory', () => {
  
    const getUUID = () => '1234'
    const getAge = () => 35

    test('buildMakePerson should return a function', () => {
      
        const makePerson = buildMakePerson({getUUID, getAge});
        expect(typeof makePerson ).toBe('function')

    });

    test('makePerson should return a person', () => {
        const makePerson = buildMakePerson({getUUID, getAge});
        const johnDoe = makePerson({name: 'john', birthdate:' 1996-10-21'})

        expect( johnDoe ).toEqual(
            { id: '1234', name: 'john', birthdate: ' 1996-10-21', age: 35 }
        )
        
    });

});