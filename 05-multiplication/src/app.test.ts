
// import './app'

import { ServerApp } from "./presentation/server-app";


describe("app", () => {

    test("should called Server.run with values", async() => {
      
      const serverRunMock = jest.fn();
      ServerApp.run = serverRunMock;
      process.argv = ['node', 'server.js', '-b', '5', '-l', '10', '-s', '-n', 'test-table', '-d', 'test-destination'];

      await import('./app');
      expect(serverRunMock).toHaveBeenCalledWith({
        base: 5,
        limit: 10,
        showTable: true,
        name: 'test-table',
        destination: 'test-destination' 

      });

    });


});







