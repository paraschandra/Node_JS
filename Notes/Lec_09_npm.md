## Lecture_09: Node Package Manager (npm)

### What is npm?
It is the world's largest software library (registry): npm is a library which contains code packages written by various developers.

It is a large public database of JavaScript code that developers from all over the world can use to share and borrow code.

We can publish a code package to the npm registry for others to use or we can borrow others code from the registry.

npm is also a software package manager that manages how the developers publish and consume code packages.

There are other package managers such as pnpm and Yarn.

npm is the default package manager for Node.js

**package.json** <br>
package.json is npm's configuration file.

It is a json file that typically lives in the root directory of your package and holds various metadata relevant to the package.

package.json is the central place to configure and describe how to interact with and run your package.

It is primarily used by the npm CLI.

`Creating a custom package:`
```js
// index.js
function greet(name) {
    console.log(`Hello ${name}, welcome!`);
}

module.exports = greet;
```
Type the following command in the terminal:
```
> npm init --yes
```
Default package.json file created:
```json
{
  "name": "custom_package",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "description": ""
}

```