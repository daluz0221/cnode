

import { WebSocketServer, WebSocket } from 'ws';

const wss = new WebSocketServer({ port: 3000 });

wss.on('connection', function connection(ws) {

    console.log('Client connected');
    
  ws.on('error', console.error);

  ws.on('message', function message(data ) {
  
    const datica =  JSON.stringify({
        payload: data.toString().toUpperCase(),
        type: "some string"
    })
    // ws.send( JSON.stringify( datica ) )
    wss.clients.forEach(function each(client) {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(datica, { binary: false });
        }
      });
  });

//   ws.send('Hola desde el server');

  ws.on('close', () => {
    console.log('Client disconnected ');
    
  })

});