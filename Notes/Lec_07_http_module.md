## Lecture_07: HTTP Module

### How the web works?
Computers connected to the internet are called clients and servers.

Clients are internet-connected devices such as computers or mobile phones along with web-accessing software available on those devices such as a web browser.

Servers on the other hand are computers that store web pages, sites, or apps.

<img src="https://static.takeuforward.org/content/-jUIKMoi0" class="center">

### HTTP (Hypertext Transfer Protocol)
A protocol that defines a format for clients and servers to speak to each other.

The client sends an HTTP request and the server responds with an HTTP response.

We can create a web server using Node.js

Node.js has access to operating system functionality like networking.

Node has an event loop to run tasks asynchronously and is perfect for creating web servers that can simultaneously handle large volumes of requests.

The node server we create should respect the HTTP format.

The HTTP module allows creation of web servers that can transfer data over HTTP.

### Creating a Node server
```js
const http = require("node:http");

const server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end("Hello World!");
});

server.listen(3000, () => {
    console.log("Server running on port 3000");
});
```

### JSON Response
```js
const http = require("node:http");

const server = http.createServer((req, res) => {
    const superHero = {
        firstName: "Bruce",
        lastName: "Wayne"
    };
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(superHero)); // JSON response
});

server.listen(3000, () => {
    console.log("Server running on port 3000");
});
```

### HTML Response
```js
const http = require("node:http");
const fs = require('node:fs');

const server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html'});
    // Don't use for large files
    // const html = fs.readFileSync("./index.html", "utf-8");
    // res.end(html);
    fs.createReadStream(__dirname + "/index.html").pipe(res);
});

server.listen(3000, () => {
    console.log("Server running on port 3000");
});
```