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
**Installing packages** <br>
To install an npm package, run the following command in your terminal:
```ls
> npm install <package-name>
```
To uninstall a package, run:
```ls
> npm uninstall <package-name>
```

**Using packages** <br>
```js
// upper-case package example
const upperCase = require('upper-case').upperCase;

function greet(name) {
  console.log(upperCase(`Hello! ${name}`));
}

greet('Ram'); // HELLO! RAM
```

**Dependencies field** <br>
The dependencies field in package.json lists the essential packages required for your project to run in a production environment. These are libraries or modules that the application depends on to function correctly. When installing packages, they are added to this field by default if installed using:
```ls
npm install <package-name> --save
```
`Example:`
```json
"dependencies": {
  "react": "^18.0.0",
  "express": "^4.18.1"
}
```

**Versioning** <br>
Versioning in npm packages follows Semantic Versioning (SemVer).

SemVer - is one of the most widely adopted versioning systems. A simple set of rules and requirements that dictate how version numbers are assigned and incremented.

It is crucial to keep a semantic and historical track of changes.

Version numbers and the way they change convey meaning about the underlying code and what has been modified from one version to the next.

It is represented as: `MAJOR.MINOR.PATCH`
- **MAJOR:** Incremented when there are incompatible API changes.
- **MINOR:** Incremented when new functionality is added in a backward-compatible manner.
- **PATCH:** Incremented for backward-compatible bug fixes.

Version Prefixes:
1. `^` → Allows updates within the same major version. 
    - Example: ^1.2.3 allows 1.3.0, not 2.0.0.
2. `~` → Allows updates within the same minor version.
    - Example: ~1.2.3 allows 1.2.4, not 1.3.0.
3. `No prefix` → Locks to the exact version.
    - Example: 1.2.3 allows only 1.2.3.

This system helps maintain compatibility and manage dependencies effectively.

**Global Packages** <br>
Global packages in Node.js are npm packages installed globally on your system and are available to all Node.js projects. These packages are typically used for command-line tools or utilities rather than being specific to a project.

`Example: nodemon`<br>
nodemon is a tool that helps develop Node.js based applications by automatically restarting the node application when file changes in the directory are detected.
```ls
npm install -g nodemon
```
Usage:
```ls
nodemon [your node app]
```

**npm Scripts** <br>
An npm script is a convenient way to bundle common commands for use in a project.

They are typically entered in the command line in order to do something with the application.

npm scripts are stored in a project's package.json file, giving access to everyone who has access to the codebase.

They also ensure that everyone is using the same command with the same options.

Common use cases for npm scripts include building your project, starting a development server, compiling CSS, linting, minifying etc.

npm scripts are executed using the command:
```ls
npm run <script_name>
```

Example:
```json
{
  "scripts": {
    "start": "node app.js",
    "test": "jest",
    "build": "webpack --mode production",
    "dev": "nodemon app.js"
  }
}
```

**Publishing an npm Package** <br>
a. Login to npm:
```ls
> npm login
```
Provide your username, password, and email.

b. Publish the Package:
```ls
npm publish
```