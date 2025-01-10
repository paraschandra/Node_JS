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