## Lecture_06: FS Module

The file system (fs) module allows you to work with the file system on your computer. It internally uses buffers.

### Read File

**Synchronous approach:**
```js
// index.js
const fs = require("node:fs");

// synchronous approach
const fileContents = fs.readFileSync("./file.txt", "utf-8");
console.log(fileContents); // Hello! World.
```

**Asynchronous approach:**
```js
const fs = require("node:fs");

fs.readFile("./file.txt", "utf-8", (error, data) => {
    if (error) {
        console.log(error);
    } else {
        console.log(data);
    }
});

console.log("Hey!");
// Hey
// Hello! World.
```

### Write File

**Synchronous approach:**
```js
const fs = require("node:fs");

fs.writeFileSync("./greet.txt", "Hello! World.");
```

**Asynchronous approach:**
```js
const fs = require("node:fs");

fs.writeFile("./greet.txt", " Hello Ram!", {flag: "a"}, (err) =>{
    if (err) {
        console.log(err);
    } else {
        console.log("File written");
    }
});
```

## fs Promise Module
```js
const fs = require("node:fs/promises");

async function readFile() {
    try [
        const data = await fs.readFile("./file.txt", "utf-8");
        console.log(data);
    ] catch (err) {
        console.log(err);
    }
}

readFile(); // Hello! World.
```

## Dealing with Streams
A stream is a sequence of data that is being moved from one point to another over time.

Stream is a built-in node module that inherits from the event emitter class. Other modules internally use streams for their functioning.

```js
const fs = require("node:fs");

const readableStream = fs.createReadStream("./file1.txt", {
    encoding: "utf-8",
    highWaterMark: 2, // by default it is 64 kB
});

const writeableStream = fs.createWriteStream("./file2.txt");

readableStream.on("data", (chunk) => {
    console.log(chunk);
    writeableStream.write(chunk);
});
/* Output:
He
ll
o 
*/
```

**Types of Streams:**<br>

- `Readble streams` from which data can be read.<br>
    Ex: Reading from a file as readable stream.

- `Writable streams` to which we can write data.<br>
    Ex: Writing to a file as writable stream.

- `Duplex streams` that are both Readable and Writable.<br>
    Ex: Sockets as duplex stream.

- `Transform streams` that can modify or transform the data as it is written and read.<br>
    Ex: File compression where we can write compressed data and read de-compressed data to and from a file as a transform stream.


## Pipes
In Node.js, pipes are a mechanism to connect the output of one stream to the input of another, allowing data to flow efficiently between them. This is a fundamental concept in Node.js for handling streaming data.

```js
const fs = require('node:fs');

const readable = fs.createReadStream('source.txt');
const writable = fs.createWriteStream('destination.txt');

readable.pipe(writable);
```

**Chaining:**<br>
You can chain multiple pipe() calls to create complex data processing pipelines.<br>
`Example (Compressing a file):`
```js
const fs = require('node:fs');
const zlib = require('node:zlib');

const readable = fs.createReadStream('input.txt');
const writable = fs.createWriteStream('output.txt.gz');
const gzip = zlib.createGzip();

readable.pipe(gzip).pipe(writable);
```