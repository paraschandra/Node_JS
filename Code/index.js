// const http = require('node:http');

// const server = http.createServer((req, res) => {
//     res.writeHead(200, {'Content-Type': 'text/plain'});
//     res.end('Hello World!');
// });

// server.listen(3000, () => {
//     console.log('Server is running on port 3000');
// });

const http = require("node:http");
const fs = require('node:fs');

const server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html'});
    // Don't use for large files
    // const html = fs.readFileSync("./index.html", "utf-8");
    fs.createReadStream(__dirname + "/index.html").pipe(res);
    // res.end(html);
});

server.listen(3000, () => {
    console.log("Server running on port 3000");
});