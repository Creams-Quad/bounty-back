# bounty-back

## Team Cream Squad

- Cullen Sharp
- Sunny Lee
- Louis Lassegue
- Tek Jones

## UML

### Web Request/Response Cycle UML

![Web Request/Response Cycle Image](assets/wrrc.png)

### Database UML

![database-01](assets/database01.png)
![database-02](assets/database02.png)
![database-03](assets/database03.png)

## Setup

1. To setup the app you want to first `fork` repository from [GitHub](https://github.com/Creams-Quad/bounty-back)
2. In the fork repository click the green `code` tab. A drop down to copy the repository link or url will be shown. Copy that link.
3. Go to your local machine terminal and `cd` into a directory or folder to copy link.
4. In that directory or folder type in `git clone (with the copied link)`
5. Type in `npm install` to install all dependencies for the app.

## Routes

### /bounties

- POST
  - description: Creates a new bounty with an id and add it to the bounties table
  - status code:(200)
  - JSON input:
    - header:{string}
    - content:{string}
    - karma:{integer}
- GET
  - description: Return a list of all bounties
  - status code:(200)
  - no JSON Input
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

### /bounties/id

- PUT
  - description: Updates a bounty within the bounties table on a given id
  - status code:(200)
  - JSON input:
    - header:{string}
    - content:{string}
    - poster:{string}  
  - Example output

```JSON
{ 
  "id": 1,
  "header": "foo",
  "content": "bar",
  "poster": "John Doe"
}
```

- GET
  - description: Return a bounty with related comments
  - status code:(200)
  - no JSON input
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

- DELETE
  - description: Delete bounty from table
  - status code:(204)
  - no JSON input
  
### /comments

- POST
  - description: Creates a comment record to comments table
  - status code:(200)
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

### /comments/id

- PUT
  - description: update a comment from comments table on an given id
  - status code:(200)
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

- GET
  - description: return a comment from comments table on an given id
  - status code:(200)
  - description: return data from database
  - no JSON input
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

- DELETE
  - description: delete a comment from comments table on an given id
  - status code:(204)
  - no JSON input

## Technologies

![Technologies Used](assets/tech.png)
![Technologies Used](assets/tech-02.png)

- [NodeJS](https://nodejs.org/en/docs/): a JavaScript runtime built on Chrome's V8 JavaScript engine.
- [Express](https://expressjs.com/): is a back end web application framework for Node.js. It is designed for building web applications and APIs.
- [jwks-rsa](https://www.npmjs.com/package/jwks-rsa): a library to retrieve signing keys from a JWKS (JSON Web Key Set) endpoint.
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken): is an open standard (RFC 7519) that defines a compact and self-contained way for securely transmitting information between parties as a JSON object.
- [Cors](https://www.npmjs.com/package/cors): is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.
- [Sequelize](https://sequelize.org/master/): is a promise-based Node.js Object–relational mapping for Postgres or other SQL databases.
- [Sequelize-cli](https://www.npmjs.com/package/sequelize-cli): Sequelize Command Line Interface
- [Sqlite3](https://www.npmjs.com/package/sqlite3): is a software library that implements a self-contained, serverless, zero-configuration, transactional SQL database engine.
- [Jest](https://jestjs.io/docs/getting-started): is a JavaScript testing framework.
- [Eslint](https://eslint.org/docs/user-guide/getting-started): is a tool for identifying and reporting on patterns found in ECMAScript/JavaScript code
- [Postgres]()
- [Heroku]()
- [Notion]() 

## Links

- [Project Management Board](https://www.notion.so/Cream-Squad-2eecc388ea1a4a70b6992435f3e885a8)
- [Bounty frontend code](https://github.com/Creams-Quad/bounty-front)

<!-- - [Bounty backend deployment]()
- [Bounty Website]() -->
