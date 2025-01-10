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

**Module Exports:**<br>
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

**Module Wrapper:**<br>
Every module in node.js gets wrapped in an IIFE before being loaded.

IIFE helps keep top-level variables scoped to the module rather than the global object.

The IIFE that wraps every module contains 5 parameters which are pretty important for the functioning of a module.

```js
(function(exports, require, module, __filename, __dirname){
    const superHero = "Batman";
    console.log(superHero);
})();
```

**Module Caching:**<br>
Module caching is a mechanism in Node.js that allows modules to be loaded and stored in memory after the first time they are required. When a module is required using the require() method, Node.js checks if the module has already been loaded. If it has, it returns the cached module instance instead of loading it again.

```js
// superHero.js
class SuperHero {
    constructor(name){
        this.name = name;
    }
    getName(){
        return this.name;
    }
    setName(name){
        this.name = name;
    }
}

module.exports = new SuperHero("Batman");
```

```js
// index.js
const superHero = require("./superHero");
console.log(superHero.getName()); // Batman
superHero.setName("Superman");
console.log(superHero.getName()); // Superman

const newSuperHero = require("./superHero");
console.log(newSuperHero.getName()); // Superman instead of Batman (due to caching)
```

**Import Export Patterns:**<br>
a. For exporting single variable/function
```js
// math.js
const add = (a, b) => {
    return a + b;
};

module.exports = add;
```
```js
// index.js
const add = require("./math");
console.log(add(2, 3)); // 5
```

b. Directly exporting a function
```js
// math.js
module.exports = (a, b) => {
    return a + b;
};
```

c. Exporting more than one variable/function
```js
// math.js
const add = (a, b) => {
    return a+b;
};

const subtract = (a, b) => {
    return a-b;
};

module.exports = {add, subtract};
```
```js
// index.js
const math = require("./math");

console.log(math.add(2, 3)); // 5
console.log(math.subtract(2, 3)); // -1
```
We can also destructure the module imports:
```js
// index.js
const math = require("./math");
const {add, subtract} = math;

console.log(add(2, 3)); // 5
console.log(subtract(2, 3)); // -1
```

d. Assigning modules as a property to `module.exports`
```js
// math.js
module.exports.add = (a, b) => {
    return a+b;
};

module.exports.subtract = (a, b) => {
    return a-b;
}
```

e. Using just exports
```js
// math.js
exports.add = (a, b) => {
    return a+b;
};
```
> It is discouraged to use only exports

**Module.exports vs exports:**<br>
- `module.exports` is the actual object that gets exported. Think of it as the container that holds everything you want to make available to other modules.

- `exports` is just a reference to module.exports. It's a shortcut for convenience.

> Assigning a new value directly to exports breaks the reference to module.exports, leading to unexpected behavior.

Therefore, it's better to stick with module.exports.

### ES Modules
ES modules is the ECMAScript standard for modules.

It was introduced with ES2015.

Node.js 14 and above support ES modules.

Instead of module.exports, we use the `export` keyword.

The export can be default or named.

We import the exported variables or functions using the `import keyword`.

If it is a default export, we can assign any name while importing.

If it's a named export, the import name must be the same.

The file extension `.mjs` is used.

**Pattern-1:**
```js
// math.mjs
const add = (a, b) => {
    return a + b;
}

export default add;

// OR

export default (a, b) => {
    return a+b;
}
```
```js
// index.mjs
import add from "./math.mjs";
console.log(add(2, 3)); // 5
```

**Pattern-2:**
```js
// math.mjs
const add = (a, b) => {
    return a+b;
};

const subtract = (a, b) => {
    return a-b;
};

export default {add, subtract};
```
```js
// index.mjs
import math from "./math.mjs";
const {add, subtract} = math;

console.log(add(2, 3));
console.log(subtract(2, 3));
```

**Pattern-3: Named exports**
```js
// math.mjs
export const add = (a, b) => {
    return a+b;
}

export const subtract = (a, b) => {
    return a-b;
}
```
```js
// index.mjs
import * as math from "./math.mjs";
const {add, subtract} = math;

// or
import {add, subtract} from "./math.mjs";

console.log(add(2, 3));
console.log(subtract(2, 3));
```