import { getAge } from "../../src/plugins";


describe('getAge', () => {
  

    test('getAge should return the age of a person', () => {
      const birthdate = '1996-02-21';
      const age = getAge(birthdate);

      expect(typeof age ).toBe('number')
    });

    test('getAge should return current age', () => {
        const birthdate = '1996-02-21';
        const age = getAge(birthdate);

        const calculateDate = new Date().getFullYear() - new Date(birthdate).getFullYear();
        expect( age ).toEqual( calculateDate )
    });

    test('getAge should return 0 years', () => {
      
        const spy = jest.spyOn(Date.prototype, 'getFullYear').mockReturnValue(1995);

        const birthdate = '1995-10-21';
        const age = getAge(birthdate)
        expect( age ).toBe(0)
        expect( spy ).toHaveBeenCalled()

    })

});