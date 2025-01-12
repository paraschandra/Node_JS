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
