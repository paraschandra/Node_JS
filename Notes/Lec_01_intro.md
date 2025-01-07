## Lecture_01: Introduction to Node.js

### What is Node.js?
`Node.js` is an open-source, cross-platform JS runtime environment.<br>

`ECMAScript` refers to the standard language whereas JavaScript is what we use in practice and builds on top of ECMAScript.<br>

Node.js is capable of executing JS code outside a browser.<br>

It can execute not only the standard ECMAScript language but also new features that are made available through C++ bindings using the V8 engine.

It consists of C++ files which form the core features and JS files which expose common utilities and some of the C++ features for easier consumption.

### What is JS Engine?
A JS engine is a program that converts JS code that developers write into machine code that allows a computer to perform specific tasks.

- V8: by Google for Chrome (written in C++)
- SpiderMonkey: powering Mozilla Firefox
- JavaScriptCore: by Apple for Safari
- Chakra: for MS Edge

JS Engine is basically a program that executes JS code. V8 is written in C++ and can be used independently or can be embedded into other C++ programs.

### What is JS Runtime?
JS runtime is an environment which provides all the necessary components in order to use and run a JS program.<br>

**Components of JS runtime:**
- JS Engine (Memory, Call Stack)
- Web APIs (DOM, Storage, Timers)
- Microtask queue
- Callback/Task queue

### What can be build with Node.js?
- Traditional websites
- Backend services like APIs
- Real-time applications
- Streaming services
- CLI tools
- Multiplayer games, etc.

### Hello! Node.js
In terminal:
```js
> node
// Welcome to Node.js v22.12.0.
// Type ".help" for more information.
> console.log('Hello! Node.js')
Hello! Node.js
undefined
>...
```

Through JS file:
```js
// index.js
console.log("Hello! Node.js");

// output: Hello! Node.js
```

### Browser vs Node.js
In the browser, most of the time we're interacting with the DOM, or other Web Platform APIs like Cookies. We don't have the document, window and all the other objects that are provided by the browser.<br>

In the browser, we don't have all the nice APIs that Node.js provides through its modules.<br>

With Node.js, we control the env.<br>
With a browser, we're at the mercy of what the user choose.