## Lecture_08: Internals of Node.js

### Node JS Architecture
<img src="https://cdn-clekk.nitrocdn.com/tkvYXMZryjYrSVhxKeFTeXElceKUYHeV/assets/images/optimized/rev-fe0ba7b/litslink.com/wp-content/uploads/2021/07/Node.js-Architecture-Chart.webp" class="center">

`JS runtime` is an environment which provides all the necessary components in order to use and run a JS program outside the browser.

At its core, it contains three major components:
- **Dependencies:** Libraries required for node.js functioning like - V8, libuv, zlib, crypto, etc.

- **C/C++ feature** like file system access and networking.

- **JS library** to provide functions & utilities to tap into C++ features using V8 engine.

### Libuv
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

**Network I/O** <br>
https.request is a network i/o operations and not a CPU bound operation.

It does not use the thread pool.

Libuv instead delegates the work to the operating system kernel and whenever possible, it will poll the kernel and see if the request has completed.

```js
const https = require('node:https');

const MAX_CALLS = 5;

const start = Date.now();
for (let i = 0; i < MAX_CALLS; i++){
    https
        .request("https://www.google.com", (res) => {
            res.on("data", () => {});
            res.on("end", () => {
                console.log(`Request: ${i + 1}`, Date.now() - start);
            })
        })
        .end();
}
/*
Request: 4 1070
Request: 3 1087
Request: 5 1100
Request: 1 1109
Request: 2 2375
*/
```

In Node.js async methods are handled by libuv. They are handled in two different ways:
1. Native async mechanism
2. Thread pool

Whenever possible, Libuv will use native async mechanisms in the OS so as to avoid blocking the main thread.

Since this is part of the kernel, there is different mechanism for each OS. We've epoll for Linux, Kqueue for MacOS and IO Completion Port on Windows.

Relying on native async mechanisms makes Node scalable as the only limitation is the operating system kernel.

Example of this type is a network I/O operation.

If there is no native async support and the task is file I/O or CPU intensive, libuv uses the thread pool to avoid blocking the main thread.

Although the thread pool preserves asynchronicity with respect to Node's main thread, it can still become a bottleneck is all threads are busy.

### Event Loop
It is a C program and is part of libuv.

A design pattern that orchestrates or co-ordinates the execution of synchronous and asynchronous code in Node.js

`Event Loop`
<img src="https://cdn.builder.io/api/v1/image/assets%2FYJIGb4i01jvw0SRdL5Bt%2F6b288555862049b4b5cd7f19e2ae909f?format=webp&width=2000" class="center">

User written synchronous JS code takes priority over async code that the runtime would like to execute.

Only after the call stack is empty, the event loop comes into picture.

**Execution order:**<br>
1. Any callbacks in the micro task queues are executed. First, tasks in the nextTick queue and only then tasks in the promise queue.
2. All callbacks within the timer queue are executed.
3. Callbacks in the micro task queues if present are executed.
4. All callbacks within the I/O queue are executed.
5. Callbacks in the micro task queues if present are executed. nextTick queue followed by Promise queue.
6. All callbacks in the check queue are executed.
7. Callbacks in the micro task if present are executed.
8. All callbacks in the close queue are executed.
9. For one final time in the same loop, the micro task queues are executed. nextTick queue followed by promise queue.

If there are more callbacks to be processed, the loop is kept alive for one more run and the same steps are repeated.

On the other hand, if all callbacks are executed and there is no more code to process, the event loop exits.

**Microtask Queue** <br>
