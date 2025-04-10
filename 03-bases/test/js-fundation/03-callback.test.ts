import { getUserByID } from "../../src/js-fundation/03-callbacks";


describe("03-callbacks", () => {
    test("getUserByID should return a user", (done) => {
        getUserByID(1, (err, user) => {
            expect(user).toEqual({
                id: 1,
                name: 'john doe'
            });
            done();
        });
    });

    test("getUserByID should return an error if user not found", (done) => {
        getUserByID(10, (err, user) => {
            expect(err).toBe(`User not found with id 10`);
            expect( user ).toBe(undefined)
            done();
        });
    });
});