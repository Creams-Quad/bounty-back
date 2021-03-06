# Bounty Back

![Dependencies](https://david-dm.org/Creams-Quad/bounty-back.svg)
![Last commit](https://img.shields.io/github/last-commit/Creams-Quad/bounty-back)

**Bounty** is a social network built around sharing recipes; more specifically, sharing and creating recipes for cold treats. **Bounty's** purpose is to crowd-source hard to find or non-existent recipes. Fulfill your cream-based cravings, and maybe make some friends on the way.

## 🚀 Getting Started

1. Fork our repo [GitHub](https://github.com/Creams-Quad/bounty-back)
1. Clone the repo `git clone`
1. Install dependencies `npm i`
1. Run tests `npm test`
1. Start a development server `npm start`

## 📖 Table of Contents

### [API Reference](#-API-Reference)

### [Entity Relationship Diagram](#-Entity-Relationship-Diagram)

### [Our Repos](#-Our-Repos)

### [Dependencies](#-Dependencies)

### [Team](#-Team)

### [More Resources](#-More-Resources)

### [Team Agreement](./TeamAgreement.md)

## 🛠 API Reference

### /login

- `POST`
  - Description: creates and returns user credentials from a JWT token
  - Status code: (200)
  - No json input
  - Auth:
    - Auth0 JWT
  - Example output

```JSON
{
  "id": 1,
  "email": "John@doe.mail",
  "role": "guildMaster",
  "permissions: ["read", "update", "create", "delete"]
}
```

### api/v1/bounties

- `POST`
  - Description: Creates a new bounty with an id and add it to the bounties table
  - Status code: (200)
  - Auth:
    - Auth0 JWT
    - 'create' permission
  - JSON input:
    - header: {string}
    - content: {string}
    - karma: {integer}

```JSON
{
  "id": 1,
  "header": "foo",
  "content": "bar",
  "poster": "John Doe",
  "karma": 100,
}
```

- `GET`
  - Description: Return a list of all bounties
  - Status code:(200)
  - Auth:
    - Auth0 JWT
    - 'read' permission
  - No JSON Input
  - Example output

```JSON
{
  "id": 1,
  "header": "foo",
  "content": "bar",
  "poster": "John Doe",
  "karma": 100,
}
```

### api/v1/bounties/:id

- `PUT`
  - Description: Updates a bounty within the bounties table on a given id
  - Status code:(200)
  - Auth:
    - Auth0 JWT
    - 'update' permissions
  - JSON input:
    - header: {string}
    - content: {string}
    - poster: {string}  
  - Example output

```JSON
{ 
  "id": 1,
  "header": "foo",
  "content": "bar",
  "poster": "John Doe"
}
```

- `GET`
  - Description: Return a bounty with related comments
  - Status code:(200)
  - Auth:
    - Auth0 JWT
    - 'read' permissions
  - No JSON input
  - Example output

```JSON
{
  "id": 1,
  "header": "foo",
  "content": "bar",
  "poster": "John Doe",
  "karma": 100,
  "comments": [
    {
      "id": 1,     
      "bountyId": 1,
      "header": "fizz",
      "content": "buzz",
      "poster": "Holly Doe",
      "karma": 100
    }
  ]
}

```

- `DELETE`
  - Description: Delete bounty from table
  - Status code:(204)
  - Auth:
    - Auth0 JWT
    - 'delete' permissions
  - No JSON input
  
### api/v1/comments

- `POST`
  - Description: Creates a comment record to comments table
  - Status code:(200)
  - Auth:
    - Auth0 JWT
    - 'create' permissions
  - JSON input:
    - header:{string}
    - content:{string}
    - poster:{string}
  - Example output

```JSON
{
  "id": 1,
  "bountyId": 1,
  "header": "fizz",
  "content": "buzz",
  "poster": "Holly Doe",
}
```

### api/v1/comments/:id

- `PUT`
  - Description: update a comment from comments table on an given id
  - Status code:(200)
  - Auth:
    - Auth0 JWT
    - 'update' permissions
  - JSON input:
    - header:{string}
    - content:{string}
    - poster:{string}
  - Example output

```JSON
{
 "id": 1,
 "header":"fizz",
 "content":"buzz",
 "poster":"Holly Doe",
}
```

- `GET`
  - Description: return a comment from comments table on an given id
  - Status code:(200)
  - Auth:
    - Auth0 JWT
    - 'read' permissions
  - No JSON input
  - Example output

```JSON
{
  "id": 1,     
  "bountyId": 1,
  "header": "fizz",
  "content": "buzz",
  "poster": "Holly Doe",
  "karma": 100
}
```

- `DELETE`
  - Description: delete a comment from comments table on an given id
  - Status code:(204)
  - Auth:
    - Auth0 JWT
    - 'delete' permissions
  - No JSON input

## 🏢 Entity Relationship Diagram

![ERD](./assets/ERD.png)

## 🚧 Our Repos

- [Bounty frontend](https://github.com/Creams-Quad/bounty-front)

## 📦 Dependencies

- [Auth0](https://www.npmjs.com/package/auth0)
- [CORS](https://www.npmjs.com/package/cors)
- [Dotenv](https://www.npmjs.com/package/dotenv)
- [Express](https://www.npmjs.com/package/express)
- [Eslint](https://www.npmjs.com/package/eslint)
- [Jest](https://www.npmjs.com/package/jest)
- [JsonWebToken](https://www.npmjs.com/package/jsonwebtoken)
- [JWKS-RSA](https://www.npmjs.com/package/jwks-rsa)
- [Pg](https://www.npmjs.com/package/pg)
- [Sequelize](https://www.npmjs.com/package/sequelize)
- [Sequelize-cli](https://www.npmjs.com/package/sequelize-cli)
- [SuperTest](https://www.npmjs.com/package/supertest)
- [Sqlite3](https://www.npmjs.com/package/sqlite3)

## 🏡 Team

- [Cullen Sharp](https://github.com/CullenSharp)
- [Sunny Lee](https://github.com/sunny-lee3)
- [Louis Lassegue](https://github.com/mrloulass)
- [Tek Jones](https://github.com/Tekthree)

## 🔍 More Resources

- [Project Management Board](https://www.notion.so/Cream-Squad-2eecc388ea1a4a70b6992435f3e885a8)

- [Bounty website](https://bounty-ice-cream.netlify.app/)
