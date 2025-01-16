## Lecture_11: Miscellaneous

### Cluster Module
Node is single threaded. No matter how many cores the machine have, node only uses a single core of CPU.

This is fine for I/O operations but if the code has long running and CPU intensive operations, our application might struggle from a performance point of view.

To help with this scenario, node introduced Cluster module.

The `cluster module` enables the creation of child processes (also called workers) that run simultaneoulsy. 

All created workers share the same server port.

**Working** <br>
Master is only in charge of the workers.

Workers are in charge of handling incoming requests, reading files etc.

Each worker gets its own event loop, memory, and V8 instance.

**Common methods:**<br>
- `cluster.fork()`: Creates a new worker process.
- `cluster.on(event, callback)`: Listens to events like `fork`, `online`, `exit`, etc.

**Example:**
```js
const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  console.log(`Master process ${process.pid} is running`);
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
  });
} else {
  http.createServer((req, res) => {
    res.writeHead(200);
    res.end('Hello from Worker!\n');
  }).listen(8000);
  console.log(`Worker ${process.pid} started`);
}
```

### Worker Threads Module
The `worker_threads` module enables the use of threads that execute JS in parallel.

Code executed in a worker thread runs in a separate child process, preventing it from blocking our main application.

The `cluster` module can be used to run multiple instances of Node.js that can distribute workloads.

While the `worker_threads` module allows running multiple application threads within a single Node.js instance.

When process isolation is not needed, that is, no separate instances of V8, event loop and memory are needed, we should use `worker_threads` module.

`main.js`
```js
const { Worker } = require('worker_threads');

const worker = new Worker('./worker.js', { workerData: 5 });

worker.on('message', (msg) => console.log(`Result: ${msg}`));
worker.on('error', (err) => console.error(err));
worker.on('exit', () => console.log('Worker exited'));
```
`worker.js`
```js
const { parentPort, workerData } = require('worker_threads');

let result = workerData * 2;
parentPort.postMessage(result);
```