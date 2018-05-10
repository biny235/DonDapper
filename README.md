# Grace Shopper

## Using Site
You may browse through products and shop as you would on any other e-commerce website. You can add to cart, edit your cart, and remove items. You can update your user info and change password. Feel free to sign up with your e-mail address to receive an e-mail upon placing an order. To check out, you can use the test card number "4242 4242 4242 4242" with any CVC number and a valid expiration date.

## Deployed Build
This project has been deployed via Heroku and can be access through the following link.

https://abmgs.herokuapp.com

## Local Build
To run this project locally, clone the repo and run the following commands in your terminal. This will ensure proper package installation and data seeding.

```
npm install
npm run seed
npm run start:dev
```

### Seed
We used Sequelize to created a database of users, products, categories, orders, line items, and addresses. Default data is included in the seed file. We have prepared an admin profile with the e-mail address "admin@test.com' and a regular user profile with the e-mail address "user@test.com". Default password is "123" for all seeded users.

### Process Environment Variables
There is some functionality that require sensitive information, which can be added as process environment variables. For example, you would run the following to set and unset `PASSWORD` as a variable.

```
export PASSWORD=Password1
unset PASSWORD
```

#### Google
You'll need an API key for Places from the Google API Console.

#### SendGrid
You'll need an username and password from SendGrid.

#### Stripe
You'll need a publishable API key and a secret key from Stripe.

### Testing
Test specs can be ran with the following command.

```
npm run test:dev
```
