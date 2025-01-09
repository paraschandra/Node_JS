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