## Lecture_02: Modules in Node.js

A module is an encapsulated and reusable chunk of code that has its own context.<br>

In Node.js, each file is treated as a seperate module.

### Types of Modules:
- **Local modules:** Modules that we create in our application.
- **Built-in modules:** Modules that Node.js ships with out of the box.
- **Third party modules:** Modules written by other developers that we can use in our application.

### Local Modules
Module:
```js
// add.js
const add = (a, b) => {
    return a + b
}

const sum = add(1, 2);
console.log(sum); 
```

```js
// index.js
require("./add");

console.log('Local modules');

// output:
// 3
// Local modules
```

In node.js, each file is a module that is isolated by default.<br>

To load a module into another file, we use the require function.<br>

When index.js is executed, the code in the module is also executed.<br>

**Module Exports**<br>
Can be used to export a required functionality of a module.
```js
// add.js
const add = (a, b) => {
    return a + b
}
// default export
module.exports = add;
```
```js
// index.js
const addFn = require("./add");

const sum = addFn(1, 2);
console.log(sum); // 3
```

**Module Scope:**<br>
Each loaded module in Node.js wrapped with an IIFE that provides private scoping of code.

It allows us to repeat variables or function names without any conflicts.
```js
// IIFE wrapping
(function (){
    // Module code
}) ();
```