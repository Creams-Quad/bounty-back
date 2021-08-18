# bounty-back

## 🚀 Getting Started

1. fork our repo [GitHub](https://github.com/Creams-Quad/bounty-back)
1. Clone the repo `git clone`
1. Install dependencies `npm i`
1. Run tests `npm test`
1. Start a development server `npm start`

---

## 📖 Table of Contents

### [API Reference](#🛠-API-Reference)

### [Our Repos](#🚧-Our-Repos)

### [Team](#🏡-Team)

### [More Resources](#🔍-More-Resources)

---

## 🛠 API Reference

### /login

> 🚧 in development

- `POST`
  - description: creates and returns user credentials from a JWT token
  - status code: (200)
  - no json input
  - authentication:
    - Auth0 JWT token

### api/v1/bounties

- `POST`
  - description: Creates a new bounty with an id and add it to the bounties table
  - status code: (200)
  - JSON input:
    - header: {string}
    - content: {string}
    - karma: {integer}
- `GET`
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

### api/v1/bounties/:id

- `PUT`
  - description: Updates a bounty within the bounties table on a given id
  - status code:(200)
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

- `DELETE`
  - description: Delete bounty from table
  - status code:(204)
  - no JSON input
  
### api/v1/comments

- `POST`
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

### api/v1/comments/:id

- `PUT`
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

- `GET`
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

- `DELETE`
  - description: delete a comment from comments table on an given id
  - status code:(204)
  - no JSON input

---

## 🚧 Our Repos

- [Bounty frontend code](https://github.com/Creams-Quad/bounty-front)

## 🏡 Team

- Cullen Sharp
- Sunny Lee
- Louis Lassegue
- Tek Jones

## 🔍 More Resources

- [Project Management Board](https://www.notion.so/Cream-Squad-2eecc388ea1a4a70b6992435f3e885a8)
