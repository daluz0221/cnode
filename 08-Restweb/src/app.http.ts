import http from 'http';
import fs from 'fs'

const server = http.createServer((req, res) => {
  
    console.log(req.url);
    
    // res.writeHead(200, {'content-type': 'text/html'});
    // res.write(`<h1>Url ${req.url}</h1>`);
    // res.end();

    // const data = {
    //     name: 'John Doe',
    //     age: 30,
    //     city: 'New York'
    // };
    // res.writeHead(200, { "content-type": 'application/json' });
    // res.end( JSON.stringify( data ) )


    if (req.url === '/') {
        const htmlFile = fs.readFileSync('./public/index.html', 'utf-8');
        res.writeHead( 200, {'content-type': 'text/html'} )
    
        res.end( htmlFile )

    } else if (req.url === '/css/style.css')
    {
        const cssFile = fs.readFileSync('./public/css/style.css', 'utf-8');
        res.writeHead( 200, {'content-type': 'text/css'} )
    
        res.end( cssFile )
    } else if (req.url === '/js/main.js'){
        const jsFile = fs.readFileSync('./public/js/main.js', 'utf-8');
        res.writeHead( 200, {'content-type': 'application/javascript'} )
    
        res.end( jsFile )
    }
    else {
        res.writeHead( 404, {'content-type': 'text/html'} )
        res.end()
    }


});


server.listen(8080, () => {
  console.log('Server running on port 8080');
  
})