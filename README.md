
# Don't use this package for production
![Logo](https://assets.fyers.in/images/logo.png)
\
![Under Development](https://img.shields.io/badge/Alpha-Under%20Development-red)

# Fyers

This is FYERS typescript node client for communicating the Fyers API version 2.\
Earlier I created this lib for my personal use, because [fyers-api-v2](https://www.npmjs.com/package/fyers-api-v2) wasn't compatiable with typescript.\
I will continue to add new features to this and I will also keep it updated.

## Installation

Install fyers with npm or yarn

```bash
  npm install fyers 
  or
  yarn add fyers
```
    
## Usage/Examples

```typescript
import fyers from 'fyers'

const appId = "your_app_ID"
const secretId = "your_secret_ID"
const redirectUrl = "your_redirect_URL"

const fyers = new fyers(appId, secretId, redirectUrl)

//METHODS
// this will return login url you can use to login with fyers and fyers will return authCode 
const loginUrl = fyers.generateLoginUrl() 
// this methods will generate access token using authCode
const token = fyers.generateAccessToken(authCode)

//get user profile 
const userProfile = fyers.getProfile(token)
```


## Roadmap

- Export data types for all methods
- Make documentation for all methods
- Make separate class for socket updates
- Use mocha for testing


## Support

For support, email isolatedbot@gmail.com


## Fyers API Documentation

[Documentation](https://myapi.fyers.in/docs/)


## 🔗 Links
[![portfolio](https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://katherineoelsner.com/)
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/)
[![twitter](https://img.shields.io/badge/twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/)

