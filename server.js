const http = require('http')
const fs = require('fs')
const _ = require('lodash');

const server = http.createServer((req,res) => {
    res.setHeader('Content-Type','text/html');
    let path = './views';
    
    switch(req.url){
        case '/' :
            path += '/index.html';
            res.statusCode = 200;
            break;
        case '/about' :
            path += '/about.html';
            res.statusCode = 201;
            break;
        case '/about-me':
            res.statusCode = 301;
            res.setHeader('Location', '/about');
            res.end();
            break;
        default : 
            path += '/404.html'; 
            res.statusCode = 404;
            break;
    }

    fs.readFile(path, (err, data) => {
        if(err){
            console.log(err); 
        }else{
            res.write(data);
            res.end();
        }
    })

});

const numbers = "123"
const evenNumbers =  _.cloneDeep(numbers);
console.log(evenNumbers); // Output: [2, 4]

server.listen(3000,'localhost', (err) => {
    if(err)
        console.log("This is error : " + err);

    console.log("Running : http://localhost:3000");
})