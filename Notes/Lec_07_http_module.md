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

### HTML Template
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Node.js | HTML Response</title>
</head>
<body>
    <h1>Hello {{name}}, welcome to Node.js</h1>
</body>
</html>
```
```js
const http = require("node:http");
const fs = require('node:fs');

const server = http.createServer((req, res) => {
    const name = "Ram";
    res.writeHead(200, {'Content-Type': 'text/html'});
    let html = fs.readFileSync("./index.html", "utf-8");
    html = html.replace("{{name}}", name);
    res.end(html);
});

server.listen(3000, () => {
    console.log("Server running on port 3000");
});
```

### HTTP Routing
```js
const http = require("node:http");
const fs = require('node:fs');

const server = http.createServer((req, res) => {
    if(req.url === "/") {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end('Home page');
    } else if (req.url === "/about") {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end('About page');
    } else if (req.url === "/api") {
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({
            firstName: 'Bruce',
            lastName: 'Wayne'
        }));
    } else {
        res.writeHead(404);
        res.end('Page not found!!!');
    }
});

server.listen(3000, () => {
    console.log("Server running on port 3000");
});
```
In enterprise-scale applications, we don't rely on these types of methods. Instead we rely on a web framework for node.js

**Web Framework:**<br>
A framework simply abstracts the lower level code allowing us to focus on the requirements than the code itself.

For example, Angular, React, Vue are all framework/libraries that help us build user interfaces without having to rely on the lower level DOM API in JS.

There are frameworks to build web or mobile applications without having to rely on the HTTP module in node.js

Ex: express, nest, hapi, koa and sails.

They build on top of the HTTP module making it easier for us to implement all the features.