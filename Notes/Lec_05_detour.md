## Lecture_05: A Detour

### Character sets and Encoding
`Character Sets` are predefined lists of characters represented by numbers.

Popular character sets - Unicode and ASCII<br>
Ex: In Unicode, `86` represents character `V`
```js
 > "V".charCodeAt()
 < 86
```

`Character Encoding` dictates how to represent a number in a character set as binary data before it can be stored in a computer.

It dictates how many bits to use to represent the number.<br>
Ex: UTF-8 states that characters should be encoded in bytes (8 bits).
```
V => 86 => 01010110
```
Similar guidelines also exist on how images and videos should be encoded and stored in binary format.

### Streams and Buffers
A `Stream` is a sequence of data that is being moved from one point to another over time.<br>
Ex: a stream of data over the internet being moved from one computer to another.

We need to process the streams of data in chunks as they arrive instead of waiting for the entire data to be available before processing.

Ex: watching a video on YouTube.
The data arrives in chunks and you watch in chunks while the rest of the data arrives over time.

Ex: transferring file contents from file A to file B.
The content arrive in chunks and you transfer in chunks while the remaining contents arrive over time.

Prevents unnecessary data downloads and memory usage.
<hr>

`Buffer` is an area where data wait for being processed.

Node.js can't control the pace at which data arrives in the stream. It can only decide when is the right time to send the data for processing.

If there is data already processed or too little data to process, Node puts the arriving data in a buffer.

It is an intentionally small area that Node maintains in the runtime to process a stream of data.

Ex: streaming a video online
If your internet connection is fast enough, the speed of the stream will be fast enough to instantly fill up the buffer and send it out for processing. That will repeat till the stream is finished.
```js
const buffer = new Buffer.from("Vishwas");

console.log(buffer);
console.log(buffer.toJSON());
// Output:
/*
<Buffer 56 69 73 68 77 61 73>
{
    type: 'Buffer',
    data: [
        86, 105, 115, 104, 119, 97, 115
    ]
}
*/
```

### Asynchronous JavaScript
JavaScript is a synchronous, blocking, single-threaded language.

**Synchronous:** If we've two functions which log messages to the console, code executes top down, with only one line executing at any given time.

**Blocking:** No matter how long a previous process takes, the subsequent processes won't kick off until the former is completed.

**Single-threaded:** A thread is simply a process that js program can use to run a task.

Each thread can only do one task at a time. 

JS has just one thread called the main thread for executing any code.

The problem with synchronous, blocking, single-threaded model of JS is that we've to wait for the responses of prior.

Just JS is not enough. We need new pieces which are outside of JS to help us write asynchronous code.

For front-end: web browsers and for back-end: Node.js

Web borwsers and Node.js define functions and APIs that allows us to register functions that should not be executed synchronously, and should instead be invoked asynchronously when some kind of event occurs.

For example: setTimeout, setInterval, addEventListener, callbacks, Promises, async-await.