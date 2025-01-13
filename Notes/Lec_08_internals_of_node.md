## Lecture_08: Internals of Node.js

### Node JS Architecture
<img src="https://cdn-clekk.nitrocdn.com/tkvYXMZryjYrSVhxKeFTeXElceKUYHeV/assets/images/optimized/rev-fe0ba7b/litslink.com/wp-content/uploads/2021/07/Node.js-Architecture-Chart.webp" class="center">

`JS runtime` is an environment which provides all the necessary components in order to use and run a JS program outside the browser.

At its core, it contains three major components:
- **Dependencies:** Libraries required for node.js functioning like - V8, libuv, zlib, crypto, etc.

- **C/C++ feature** like file system access and networking.

- **JS library** to provide functions & utilities to tap into C++ features using V8 engine.

### libuv
libuv is a cross platform open source library written in C language.

It handles asynchronous non-blocking operations in Node.js

It abstracts away the complexity of dealing with OS by using Thread pool and event loop.

**Thread Pool**<br>
In Node.js, the thread pool is a set of worker threads managed by the libuv library. It's used to offload computationally intensive or blocking tasks, ensuring the main JavaScript thread remains responsive.

How it works:
- Node.js's main thread is responsible for handling the event loop, which manages asynchronous operations.
- When a task that is CPU-bound or uses blocking I/O is encountered, it can be offloaded to the thread pool.
- The thread pool executes the task in the background, allowing the main thread to continue processing other events.
- Once the task is complete, the thread pool sends the result back to the main thread.

Common use cases: fs, crypto, DNS lookups, zlib operations.

`Example:`
```js
const crypto = require('node:crypto');

const start = Date.now();
// synchronous execution
crypto.pbkdf2Sync("password", "salt", 100000, 512, "sha512");
crypto.pbkdf2Sync("password", "salt", 100000, 512, "sha512"); 
// will take twice the amount of time
console.log("Hash: ", Date.now() - start); // 2014
```

Asynchronous method under the hood runs on thread pool, making them non-blocking.
```js
const crypto = require('node:crypto');

// asynchronous execution
const MAX_CALLS = 3;
const start = Date.now();
for (let i = 0; i < MAX_CALLS; i++) {
    crypto.pbkdf2("password", "salt", 100000, 512, "sha512", () => {
        console.log(`Hash: ${i+1}`, Date.now() - start);
    });
}
/*
Hash: 2 992
Hash: 1 1004
Hash: 3 1104
*/
```

**Thread Pool Size**<br>
By default, libuv uses a thread pool with 4 threads, but this number can be changed by setting the `UV_THREADPOOL_SIZE` environment variable. This means that you can increase or decrease the number of threads in the thread pool depending on the requirements of your application.
```js
process.env.UV_THREADPOOL_SIZE = 8;
```
> Increasing thread pool size beyond the number of core on the machine makes the OS to juggle the threads between the available cores resulting in the increased execution time.