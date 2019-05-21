# pokestats API

## Introduction

[https://jokr.herokuapp.com/api/](https://jokr.herokuapp.com/api/)

You're a funny guy, but you keep losing your list of jokes and forgetting which ones had the best reactions! Well worry no more- Dad (or bad??) jokes app to the rescue.

## Table of Contents

- [Overview](#overview)
  - [Installation](#Installation)
  * [API URL](#api-url)
  * [SCHEMA](#SCHEMA)
  * [Test accounts](#Test-Accounts)
  * [API endpoints](#API-ENDPOINTS)
- [Auth routes](#AUTH-ROUTES)
  - [Register](#REGISTER)
  - [Login](#Login)
---

# Overview

This repository holds all back-end files and resources for jokr application and its readme documentation. This repository was made during Lambda School's build week where students join a team that consists other students from different cohorts. Each cohorts are responsible for either UI, Front End, Back End, and leading the team. This repository is for th Back end side.

---

## API URL

https://jokr.herokuapp.com/api

[Back to Table of Contents](#table-of-contents)

---

## Installation

Fork/Clone the repository. In the same directory as the package.json, in your terminal:

```
yarn install
```

This is to install all needed packages. To start the server, in your terminal, type:

```
yarn server
```

To test the repository:

```
yarn test
```

[Back to Table of Contents](#table-of-contents)

---

## SCHEMA

`user`

```
    {
        "id": 1,                            // Integer [Primary key]
        "username": "admin",                // String [Required, Unique]
        "password": "password",             // String [Required]
        "roles_id: 1                        // Integer [Required, Unique]
    }
```

`joke`

```
    {
        "id": 1,                                            // Integer [Primary Key]
        "category": "Animal",                               // String [Max 50 characters, Required]
        "setup": "What is smarter than a talking bird?",    // String [Max 500 character, Required]
        "punch_line": "A spelling bee",                     // String [Max 500 character, Required]
        "likes": 999                                        // Integer [Defaulted to 0]
    }
```

`joke wallet`

```
    {
        "id": 1,
        "user_id": 1,
        "joke_id": 1
    }

```

[Back to Table of Contents](#table-of-contents)

## Test Accounts

```

  username: 'admin',
  password: 'password'


  username: 'test',
  password: 'password'


  username: 'test2',
  password: 'password'

```

[Back to Table of Contents](#table-of-contents)

## API ENDPOINTS

| name                        | method | endpoint       | description                                                                                                                         |
| --------------------------- | ------ | -------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| Register                    | POST   | /auth/register | Creates a new `user` to the users table in the database                                                                             |
| Login                       | POST   | /auth/login    | Checks whether payload from the `body` matches with a user in the database. On Succesful login, returns a message and a `JWT Token` |
| Get all users               | GET    | /auth          | `PROTECTED ROUTE` - Returns an array of user objects of all users                                                                   |
| Get all jokes               | GET    | /jokes         | `PROTECTED ROUTE` - Returns an array of joke objects                                                                                |
| Get a joke by ID            | GET    | /jokes/:id     | `PROTECTED ROUTE` - Returns an a joke object by ID                                                                                  |
| Get wallet of specific user | GET    | /wallet        | `PROTECTED ROUTE` - Returns and array of objects of all jokes in the user's wallet                                                  |
| Add a new joke              | POST   | /jokes         | `PROTECTED ROUTE` - Returns the joke object created                                                                                 |
| Edit a joke                 | PUT    | /jokes/:id     | `PROTECTED ROUTE` - Returns the joke object created                                                                                 |
| Add to wallet               | POST   | /wallet/:id    | `PROTECTED ROUTE` - Inserts payload into the backpack database                                                                      |
| Delete from wallet          | DELETE | /wallet/:id    | `PROTECTED ROUTE` - Delete a specific wallet by ID                                                                                  |

[Back to Table of Contents](#table-of-contents)

---

# AUTH ROUTES

## **REGISTER**

### **Registers a user**

_Method Url:_ `/auth/register`

_HTTP method:_ **[POST]**

#### Headers

| name           | type   | required | description              |
| -------------- | ------ | -------- | ------------------------ |
| `Content-Type` | String | Yes      | Must be application/json |

#### Body

| name       | type   | required | description    |
| ---------- | ------ | -------- | -------------- |
| `username` | String | Yes      | Must be unique |
| `password` | String | Yes      |                |
| `roles_id` | String | Yes      | Must be unique |

_example:_

```
{
  username: "admin",
  password: "password",
  roles_id: 1
}
```

#### Response

##### 200 (OK)

> If you successfully register a user the endpoint will return an HTTP response with a status code `200` and a body as below.

```
{
  "id":1,
  "token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0Ijo0LCJ1c2V"
}
```

##### 400 (Bad Request)

> If you send in invalid fields, the endpoint will return an HTTP response with a status code `400` and a body as below.

```
{
  "error": true,
  "message": "There was a problem with your request."
}
```

[Back to Table of Contents](#table-of-contents)

---

## **LOGIN**

### **Logs a user in**

_Method Url:_ `/auth/login`

_HTTP method:_ **[POST]**

#### Headers

| name           | type   | required | description              |
| -------------- | ------ | -------- | ------------------------ |
| `Content-Type` | String | Yes      | Must be application/json |

#### Body

| name       | type   | required | description                                                        |
| ---------- | ------ | -------- | ------------------------------------------------------------------ |
| `username` | String | Yes      | Must match a username in the database                              |
| `password` | String | Yes      | Must match a password in the database corresponding to above email |

_example:_

```
{
  username: "admin",
  password: "password"
}
```

#### Response

##### 200 (OK)

> If you successfully login, the endpoint will return an HTTP response with a status code `200` and a body as below.

```
{
  "id": 1,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0"
}
```
