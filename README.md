# Frontend Tech Test

## Objectives
- Evaluation of programming style
- Evaluation of language knowledge
- Evaluation of testing approach

## Deadline
- Assignment should be ready within 5 natural days of inbox reception
- Assignment is completed when we receive the link to the repository

## Task Description
You are the lead FE programmer for a small web shop. You are required to make a simple page where the user can add products to a cart, and the total of the cart is updated in real time.

You will have an API endpoint that returns products with the following structure:

| ID   | Name         | Price |
| ---- | -------------|-------|
| GR1  | Green Tea    |£3.11  |
| SR1  | Strawberries |£5.00  |
| CF1  | Coffee       |£11.23 |

This already implemented for you using [mirage](https://www.ember-cli-mirage.com/) in the file `mirage/config.js` you can modify this file and adapt it to your needs

### Special conditions
- The CEO is a big fan of buy-one-get-one-free offers and of green tea. He wants us to add a rule to do this.
- The COO, though, likes low prices and wants people buying strawberries to get a price discount for bulk purchases. If you buy 3 or more strawberries, the price should drop to £4.50
- The CTO is a coffee addict. If you buy 3 or more coffees, the price of all coffees should drop to two thirds of the original price.

We can assume that discounts do not change very often so they can be hardcoded in the application, for display purposes.
Our check-out can scan items in any order, and because the C*Os change their minds, it needs to be flexible regarding our pricing rules.

## Deliverables
- A shop route where the user can view all available items and add to basket (a quantity selector would be nice). There is already a route `products` implemented as an example (files `app/templates/products.hbs` and `app/routes/products.js` ), it renders all the product available on the mirage endpoint. You can decided wether to use this route or implemented another. Also there is a `Product` component you can use as example (files `app/components/product.js` and `app/components/product.hbs`)
- A checkout route where the user can view all items in his basket with:
  - The quantity of each item and the original prices
  - All the discounts currently applied
  - The total price of the basket after discounts applied
- Some navigation implementation between the routes.
- A service or similar that is responsible of calculating and persisting total amount.
- The wireframes to create the components and elements used on the app are specified in this [Figma](https://www.figma.com/file/xhMkdALy0WxUN7g4lIw3vn/FE-Technical-Test_Kantox?type=design&node-id=86%3A219&mode=design&t=g3K3FPssMx8axuHL-1) file.

### Bonus point
- Implement tests (integration or acceptance)

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/) (with npm)
* [Ember CLI](https://cli.emberjs.com/release/)
* [Google Chrome](https://google.com/chrome/)

## Installation

* `git clone <repository-url>` this repository
* `cd fe-tech-test`
* `npm install`

With this, you will have an empty app with two routes already implemented `index` and `product`.
[TailwindCSS](https://tailwindcss.com/) is installed so you can make use of it.
A simple backend is available using Mirage, you can modifiy it and adapt it for your needs.
There is no need to install anything else to make the app work, of course you can add any
other library you want to use. 

## Running / Development

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).
* Visit your tests at [http://localhost:4200/tests](http://localhost:4200/tests).

### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

### Running Tests

* `ember test`
* `ember test --server`

### Linting

* `npm run lint`
* `npm run lint:fix`

### Building

* `ember build` (development)
* `ember build --environment production` (production)

### Deploying

Specify what it takes to deploy your app.

## Further Reading / Useful Links

* [ember.js](https://emberjs.com/)
* [ember-cli](https://cli.emberjs.com/release/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)
# fe-tech-test
