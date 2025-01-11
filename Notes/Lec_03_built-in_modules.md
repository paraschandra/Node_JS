## Lecture_03: Built-in Modules

Modules that Node.js ships with. Also referred to as core modules.

Import modules before you can use it.
- path
- events
- fs
- stream
- http

### Path module
The path module provides utilities for working with file and directory path.

```js
const path = require("node:path");

console.log(__filename); // path to current file
console.log(__dirname); // path to cwd
```

`path.basename`
```js
const path = require("node:path");

console.log(path.basename(__filename)); //index.js
console.log(path.basename(__dirname)); // Node JS
```

`path.extname`
```js
const path = require("node:path");

console.log(path.extname(__filename)); // .js
console.log(path.extname(__dirname)); // 
```

`path.parse`
```js
const path = require("node:path");

console.log(path.parse(__filename));
/* Output:
{
    root: '/',
    dir: '/path_to_dir',
    base: 'index.js',
    ext: '.js',
    name: 'index'
}
*/
```

`path.format`
```js
const path = require("node:path");

console.log(path.format(path.parse(__filename)));
// /path_to_file
```

`path.isAbsolute`
```js
const path = require("node:path");

console.log(path.isAbsolute(__filename)); // true
```

`path.join`
```js
const path = require("node:path");

console.log(path.join("folder1", "folder2", "index.html"));
// folder1/folder2/index.html
console.log(path.join("/folder1", "folder2", "index.html"));
// /folder1/folder2/index.html
console.log(path.join("/folder1", "//folder2", "index.html"));
// /folder1/folder2/index.html
console.log(path.join("/folder1", "//folder2", "../index.html"));
// /folder1/index.html
console.log(path.join(__dirname, "data.json"));
// /path_to_cwd/NodeJS/data.json
```

`path.resolve`
```js
const path = require("node:path");

console.log(path.resolve("folder1", "folder2", "index.html"));
// /path_to_cwd/folder1/folder2/index.html
console.log(path.resolve("/folder1", "folder2", "index.html"));
// /folder1/folder2/index.html
console.log(path.resolve("/folder1", "//folder2", "index.html"));
// /folder2/index.html
console.log(path.resolve("/folder1", "//folder2", "../index.html"));
// /index.html
console.log(path.resolve(__dirname, "data.json"));
// /path_to_cwd/NodeJS/data.json
```

**Callbacks:**<br>
In JS, functions are first class objects.

A function can be passed as an argument to a function.

A function can also be returned as values from other functions.
```js
function greet(name){
    console.log(`Hello ${name}`);
}

function hof(callback){
    const name = 'Vishwas';
    callback(name);
}

hof(greet); // Hello Vishwas
```

**Types of Callbacks:**<br>
1. `Synchronous callbacks:` A callback which is executed immediately is called a synchronous callback.
```js
// Synchronous callbacks example
let numbers = [1, 2, 4, 7, 3, 5, 6]
numbers.sort((a, b) => a-b);
numbers.filter(n => n % 2 === 0);
numbers.map(n => n/2);
```

2. `Asynchronous callbacks:` A callback that is often used to continue or resume code execution after an asynchronous operation has completed.
Asynchronous callbacks are used to delay the execution of a function until a particular time or event has occurred.<br><br>
In Node.js have an asynchronous nature to prevent blocking of execution.<br>
Ex: reading data from a file, fetching data from a database or handling a network request.
```js
// Example in browser
function callback() {
    document.getElementById("demo").innerHTML = "Hello World";
}
document.getElementById("btn").addEventListener("click", callback);
```