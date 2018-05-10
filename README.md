# Grace Shopper

## Deployed Build
This project has been deployed via Heroku and can be access through the following link.

https://abmgs.herokuapp.com

## Local Build
To run this project locally, clone the repo and run the following commands in your terminal. This will ensure proper package installation and data seeding.

```javascript
npm install
npm run seed
npm run start:dev
```

### Process Environment Variables
There is some functionality that require sensitive information, which can be added as process environment variables. For example, you would run the following to set and unset `PASSWORD` as a variable.

```javascript
export PASSWORD=Password1
unset PASSWORD
```

Alternatively, you can use this module to set variables.

https://github.com/motdotla/dotenv

## Testing
Test specs can be ran with the following command.

```javascript
npm run test:dev
```
