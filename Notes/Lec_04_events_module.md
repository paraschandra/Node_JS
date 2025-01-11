## Lecture_04: Events Module

The events module allows us to work with events in Node.js

An `event` is an action or an occurrence that has happened in our application that we can respond to.

Using the events module, we can dispatch our own custom events and respond to those custom events in a non-blocking manner.

```js
// index.js
const EventEmitter = require("node:events"); // returns a class

const emitter = new EventEmitter(); // make a new emitter obj.

emitter.on("order-pizza", (size, topping) => {
    console.log(`Order received! Baking a ${size} pizza with ${topping} topping.`);
});

// multiple listeners are allowed
emitter.on("order-pizza", (size) => {
    if (size === "large") {
        console.log("Serving a complimentary drink.");
    }
})

emitter.emit("order-pizza", "large", "mushroom"); 
// Order received! Baking a large pizza with mushroom topping.
// Serving a complimentary drink.
```

### Extending from EventEmitter

Making our own module on the top of `EventEmitter` class.
```js
// pizza-shop.js
const EventEmitter = require("node:events");

class PizzaShop extends EventEmitter {
    constructor() {
        super();
        this.orderNumber = 0
    }

    order(size, topping) {
        this.orderNumber++;
        this.emit("order", size, topping);
    }

    displayOrderNumber() {
        console.log(`Current order number: ${this.orderNumber}`);
    }
}

module.exports = PizzaShop;
```

```js
// index.js

const PizzaShop = require("./pizza-shop");
const pizzaShop = new PizzaShop();

pizzaShop.on("order", (size, topping) => {
    console.log(`Order received! Baking a ${size} pizza with ${topping} topping.`)
})

pizzaShop.order("large", "mushroom"); 
// Order received! Baking a large pizza with mushroom topping.
pizzaShop.orderNumber();
// Current order number: 1
```

> **http**, **stream** and **fs** modules also extends EventsEmitter class