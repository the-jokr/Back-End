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
- [User routes](#user-routes)
  - [Get all users](#Get-all-users)
  - [Get user by ID](#Get-user-by-id)
  - [Delete user](#delete-user)
  - [Update user](#update-user)

* [Pokemon routes](#pokemon-routes)
  - [Get all pokemon](#get-all-pokemon)
  - [Get ErrThang](#GET-ERRTHANG)
  - [Get all pokemon with pagination](#get-all-pokemon-with-pagination)
  - [Get pokemon by ID](#get-pokemon-by-id)
* [Backpack routes](#-BACKPACK-ROUTES)
  - [Get All from backpack](#GET-ALL)
  - [Post to Backpack](#POST-TO-BACKPACK)
  - [Get backpack of user](#GET-BACKPACK-OF-USER)
  - [Delete Pokemon in Backpack](#DELETE-POKEMON-IN-BACKPACK)

---

# Overview

This repository holds all back-end files and resources for jokr application and its readme documentation. This repository was made during Lambda School's build week where students join a team that consists other students from different cohorts. Each cohorts are responsible for either UI, Front End, Back End, and leading the team. This repository is for th Back end side.

---

## API URL

https://pokepokepokedex.herokuapp.com

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
  "token" : "You have registered, ceciljohn!"
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
  username: "ceciljohn",
  password: "password"
}
```

#### Response

##### 200 (OK)

> If you successfully login, the endpoint will return an HTTP response with a status code `200` and a body as below.

```
{
  "message": "Welcome ceciljohn!",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTQ0MzM1NjUxLCJleHAiOjE1NzU4OTMyNTF9.uqd2OHBYkGQpwjLTPPiPWYkYOKlG7whQDFkk46xGXoE"
}
```

##### 400 (Bad Request)

> If you send in invalid fields or the passwords do not match, the endpoint will return an HTTP response with a status code `400` and a body as below.

```
{
  "error": true,
  "message": "There was a problem with your request."
}
```

##### 404 (Not Found)

> If you send in an email address that does not match one in the database, the endpoint will return an HTTP response with a status code `404` and a body as below.

```
{
  "error": true,
  "message": "The requested content does not exist."
}
```

[Back to Table of Contents](#table-of-contents)

---

# USER ROUTES

## **GET ALL USERS**

### Returns all users

_Mehod Url:_ `/api/users`
_HTTP method:_ **[GET]**

#### Headers

| name            | type   | required | description                    |
| --------------- | ------ | -------- | ------------------------------ |
| `Content-Type`  | String | Yes      | Must be application/json       |
| `Authorization` | String | No       | Bearer JWT authorization token |

#### Response

##### 200 (OK)

> If you successfully get al the users, the endpoint will return an HTTP response with a status code `200` and a body as below.

```
{
  {
    "total": 3,
    "last_page": 1,
    "per_page": 15,
    "current_page": 1,
    "from": 0,
    "to": 3,
    "data": [
      {
        "id": 1,
        "username": "admin",
        "email": "admin@administrator.com"
      },
      {
        "id": 2,
        "username": "beniscool",
        "email": "beniscool@administrator.com"
      },
      {
        "id": 3,
        "username": "ceciljohn",
        "email": "ceciljohn@administrator.com"
      }
    ]
  }
}
```

##### 400 (Bad Request)

> If you send in invalid fields or the password of the user corresponding to the token does not match the currentPassword field, the endpoint will return an HTTP response with a status code `400` and a body as below.

```
{
  "error": true,
  "message": "There was a problem with your request."
}
```

##### 401 (Unauthorized)

> If you are not logged in, then endpoint will return an HTTP response with a status code `401` and a body as below.

```
{
  "error": true,
  "message": "You are unathorized to view the content."
}
```

---

## **GET USER BY ID**

### Returns selected user by ID

_Mehod Url:_ `/api/users/:id`
_HTTP method:_ **[GET]**

#### Headers

| name            | type   | required | description                    |
| --------------- | ------ | -------- | ------------------------------ |
| `Content-Type`  | String | Yes      | Must be application/json       |
| `Authorization` | String | No       | Bearer JWT authorization token |

#### Parameters

| name | type | required | description         |
| ---- | ---- | -------- | ------------------- |
| `id` | Int  | Yes      | Id of specific user |

#### Response

##### 200 (OK)

> If you successfully get al the users, the endpoint will return an HTTP response with a status code `200` and a body as below.

```
{
  "id": 1,
  "username": "admin",
  "email": "admin@administrator.com"
}
```

##### 401 (Unauthorized)

> If you are not logged in, then endpoint will return an HTTP response with a status code `401` and a body as below.

```
{
  "error": true,
  "message": "You are unathorized to view the content."
}
```

[Back to Table of Contents](#table-of-contents)

---

## **DELETE USER**

### Deletes seletcted user by ID

_Mehod Url:_ `/api/users/:id`
_HTTP method:_ **[DELETE]**

#### Headers

| name           | type   | required | description              |
| -------------- | ------ | -------- | ------------------------ |
| `Content-Type` | String | Yes      | Must be application/json |

#### Parameters

| name | type | required | description         |
| ---- | ---- | -------- | ------------------- |
| `id` | Int  | Yes      | Id of specific user |

#### Response

##### 200 (OK)

> If you successfully delete the selected user, the endpoint will return an HTTP response with a status code `200` and a body as below.

```
{
  "id": 1,
  "username": "admin",
  "email": "admin@administrator.com"
}
```

##### 401 (Unauthorized)

> If you are not logged in, then endpoint will return an HTTP response with a status code `401` and a body as below.

```
{
  "error": true,
  "message": "You are unathorized to view the content."
}
```

[Back to Table of Contents](#table-of-contents)

---

## **UPDATE USER**

### Updates seletcted user by ID

TBA

[Back to Table of Contents](#table-of-contents)

---

# POKEMON ROUTES

## **GET ALL POKEMON(LIMITED)**

### Returns all pokemon name and ID

_Mehod Url:_ `/api/pokemon/all`
_HTTP method:_ **[GET]**

#### Headers

| name            | type   | required | description                    |
| --------------- | ------ | -------- | ------------------------------ |
| `Content-Type`  | String | Yes      | Must be application/json       |
| `Authorization` | String | No       | Bearer JWT authorization token |

#### Response

##### 200 (OK)

> If you successfully get all the pokemon, the endpoint will return an HTTP response with a status code `200` and a body as below.

```
{
  {
        "id": 1,
        "name": "Bulbasaur"
    },
    {
        "id": 2,
        "name": "Ivysaur"
    },
    {
        "id": 3,
        "name": "Venusaur"
    },
    {
        "id": 4,
        "name": "Charmander"
    },
    {
        "id": 5,
        "name": "Charmeleon"
    },


    ...

   to the 800th+ pokemon object
```

##### 401 (Unauthorized)

> If you are not logged in, then endpoint will return an HTTP response with a status code `401` and a body as below.

```
{
  "error": true,
  "message": "You are unathorized to view the content."
}
```

[Back to Table of Contents](#table-of-contents)

---

## **GET ERRTHANG**

### Returns all pokemon and pokemon properties

_Mehod Url:_ `/api/pokemon/errthang`
_HTTP method:_ **[GET]**

#### Headers

| name            | type   | required | description                    |
| --------------- | ------ | -------- | ------------------------------ |
| `Content-Type`  | String | Yes      | Must be application/json       |
| `Authorization` | String | No       | Bearer JWT authorization token |

#### Response

##### 200 (OK)

> If you successfully get all the pokemon, the endpoint will return an HTTP response with a status code `200` and a body as below.

```
{
        "id": 1,
        "name": "Bulbasaur",
        "pokedex_number": 1,
        "type1": "grass",
        "type2": "poison",
        "height_m": 0.7,
        "weight_kg": 6.9,
        "abilities": "['Overgrow', 'Chlorophyll']",
        "base_happiness": 70,
        "hp": 45,
        "attack": 49,
        "defense": 49,
        "sp_attack": 65,
        "sp_defense": 65,
        "speed": 45,
        "generation": 1,
        "capture_rate": "45",
        "graph": [
            1,
            1,
            1,
            0.5,
            0.5,
            0.5,
            2,
            2,
            1,
            0.25,
            1,
            2,
            1,
            1,
            2,
            1,
            1,
            0.5
        ]
    },
    {
        "id": 2,
        "name": "Ivysaur",
        "pokedex_number": 2,
        "type1": "grass",
        "type2": "poison",
        "height_m": 1,
        "weight_kg": 13,
        "abilities": "['Overgrow', 'Chlorophyll']",
        "base_happiness": 70,
        "hp": 60,
        "attack": 62,
        "defense": 63,
        "sp_attack": 80,
        "sp_defense": 80,
        "speed": 60,
        "generation": 1,
        "capture_rate": "45",
        "graph": [
            1,
            1,
            1,
            0.5,
            0.5,
            0.5,
            2,
            2,
            1,
            0.25,
            1,
            2,
            1,
            1,
            2,
            1,
            1,
            0.5
        ]
    },

    ...

   to the 800th+ pokemon object
```

##### 401 (Unauthorized)

> If you are not logged in, then endpoint will return an HTTP response with a status code `401` and a body as below.

```
{
  "error": true,
  "message": "You are unathorized to view the content."
}
```

[Back to Table of Contents](#table-of-contents)

---

## **GET ALL POKEMON WITH PAGINATION**

### Returns all pokemon; 15 per page

_Mehod Url:_ `/api/pokemon`
_HTTP method:_ **[GET]**

#### Headers

| name            | type   | required | description                    |
| --------------- | ------ | -------- | ------------------------------ |
| `Content-Type`  | String | Yes      | Must be application/json       |
| `Authorization` | String | No       | Bearer JWT authorization token |

#### Response

##### 200 (OK)

> If you successfully get all the pokemon with pagination that limits the list to 15 pokemon per page, the endpoint will return an HTTP response with a status code `200` and a body as below.

```
{
  "total": 801,
  "last_page": 54,
  "per_page": 15,
  "current_page": 1,
  "from": 0,
  "to": 15,
  "data": [
    {
      "id": 1,
      "name": "Bulbasaur",
      "pokedex_number": 1,
      "type1": "grass",
      "type2": "poison",
      "height_m": 0.7,
      "weight_kg": 6.9,
      "abilities": "['Overgrow', 'Chlorophyll']",
      "base_happiness": 70,
      "hp": 45,
      "attack": 49,
      "defense": 49,
      "sp_attack": 65,
      "sp_defense": 65,
      "speed": 45,
      "generation": 1,
      "capture_rate": "45"
    },

    ...

    {
      "id": 15,
      "name": "Beedrill",
      "pokedex_number": 15,
      "type1": "bug",
      "type2": "poison",
      "height_m": 1,
      "weight_kg": 29.5,
      "abilities": "['Swarm', 'Sniper']",
      "base_happiness": 70,
      "hp": 65,
      "attack": 150,
      "defense": 40,
      "sp_attack": 15,
      "sp_defense": 80,
      "speed": 145,
      "generation": 1,
      "capture_rate": "45"
    }
  ]
}
```

##### 401 (Unauthorized)

> If you are not logged in, then endpoint will return an HTTP response with a status code `401` and a body as below.

```
{
  "error": true,
  "message": "You are unathorized to view the content."
}
```

[Back to Table of Contents](#table-of-contents)

---

## **GET POKEMON BY ID**

### Returns selected pokemon by ID

_Mehod Url:_ `/api/pokemon/:id`
_HTTP method:_ **[GET]**

#### Headers

| name            | type   | required | description                    |
| --------------- | ------ | -------- | ------------------------------ |
| `Content-Type`  | String | Yes      | Must be application/json       |
| `Authorization` | String | No       | Bearer JWT authorization token |

#### Parameters

| name | type | required | description            |
| ---- | ---- | -------- | ---------------------- |
| `id` | Int  | Yes      | Id of specific pokemon |

#### Response

##### 200 (OK)

> If you successfully get the selected pokemon, the endpoint will return an HTTP response with a status code `200` and a body as below.

```
{
  "id": 151,
  "name": "Mew",
  "pokedex_number": 151,
  "type1": "psychic",
  "type2": null,
  "height_m": 0.4,
  "weight_kg": 4,
  "abilities": "['Synchronize']",
  "base_happiness": 100,
  "hp": 100,
  "attack": 100,
  "defense": 100,
  "sp_attack": 100,
  "sp_defense": 100,
  "speed": 100,
  "generation": 1,
  "capture_rate": "45"
}
```

##### 401 (Unauthorized)

> If you are not logged in, then endpoint will return an HTTP response with a status code `401` and a body as below.

```
{
  "error": true,
  "message": "You are unathorized to view the content."
}
```

[Back to Table of Contents](#table-of-contents)

---

# BACKPACK ROUTES

## **GET ALL**

### Returns all pokemon in backpack

_Mehod Url:_ `/api/backpack`
_HTTP method:_ **[GET]**

#### Headers

| name            | type   | required | description                    |
| --------------- | ------ | -------- | ------------------------------ |
| `Content-Type`  | String | Yes      | Must be application/json       |
| `Authorization` | String | No       | Bearer JWT authorization token |

#### Response

##### 200 (OK)

> If you successfully get all the pokemon in the backpack table, the endpoint will return an HTTP response with a status code `200` and a body as below.

```
[
    {
        "id": 1,
        "type1": "fire",
        "type2": null,
        "name": "Charmander",
        "pokedex_number": 4,
        "users_id": 1
    },
    {
        "id": 2,
        "type1": "water",
        "type2": null,
        "name": "Squirtle",
        "pokedex_number": 7,
        "users_id": 2
    }
]
```

##### 401 (Unauthorized)

> If you are not logged in, then endpoint will return an HTTP response with a status code `401` and a body as below.

```
{
  "error": true,
  "message": "You are unathorized to view the content."
}
```

[Back to Table of Contents](#table-of-contents)

---

## **POST TO BACKPACK**

### Inserts a pokemon to the backpack

_Mehod Url:_ `/api/backpack`
_HTTP method:_ **[POST]**

#### Headers

| name           | type   | required | description              |
| -------------- | ------ | -------- | ------------------------ |
| `Content-Type` | String | Yes      | Must be application/json |

#### Body

| name             | type    | required | description |
| ---------------- | ------- | -------- | ----------- |
| `name`           | String  | Yes      |             |
| `pokedex_number` | Integer | Yes      |             |
| `type1`          | String  | Yes      |             |
| `type2`          | String  | No       |             |
| `users_id`       | Interer | Yes      | Foreign Key |

_example:_

```
{
    "name": "Squirtle",
    "pokedex_number": 7,
    "type1": "water",
    "type2": null
    "users_id": 1,
}
```

#### Response

##### 200 (OK)

> If you successfully get all the pokemon in the backpack table, the endpoint will return an HTTP response with a status code `200` and a body as below.

```
{
    "id": 3,
    "type1": "water",
    "type2": null,
    "name": "Squirtle",
    "pokedex_number": 7,
    "users_id": 1
}
```

##### 401 (Unauthorized)

> If you are not logged in, then endpoint will return an HTTP response with a status code `401` and a body as below.

```
{
  "error": true,
  "message": "You are unathorized to view the content."
}
```

[Back to Table of Contents](#table-of-contents)

---

## **GET BACKPACK OF USER**

### Returns backpack of selected user by ID

_Mehod Url:_ `/api/backpack/:id`
_HTTP method:_ **[GET]**

#### Headers

| name            | type   | required | description                    |
| --------------- | ------ | -------- | ------------------------------ |
| `Content-Type`  | String | Yes      | Must be application/json       |
| `Authorization` | String | No       | Bearer JWT authorization token |

#### Parameters

| name | type | required | description         |
| ---- | ---- | -------- | ------------------- |
| `id` | Int  | Yes      | Id of specific user |

#### Response

##### 200 (OK)

> If you successfully get al the users, the endpoint will return an HTTP response with a status code `200` and a body as below.

```
[
    {
        "id": 1,
        "type1": "fire",
        "type2": null,
        "name": "Charmander",
        "pokedex_number": 4,
        "users_id": 1
    },
    {
        "id": 2,
        "type1": "water",
        "type2": null,
        "name": "Squirtle",
        "pokedex_number": 7,
        "users_id": 1
    },
    {
        "id": 3,
        "type1": "water",
        "type2": null,
        "name": "Squirtle",
        "pokedex_number": 7,
        "users_id": 1
    }
]
```

##### 401 (Unauthorized)

> If you are not logged in, then endpoint will return an HTTP response with a status code `401` and a body as below.

```
{
  "error": true,
  "message": "You are unathorized to view the content."
}
```

[Back to Table of Contents](#table-of-contents)

---

## **DELETE POKEMON IN BACKPACK**

### Returns backpack of selected user by ID

_Mehod Url:_ `/api/backpack/:id`
_HTTP method:_ **[DELETE]**

#### Headers

| name            | type   | required | description                    |
| --------------- | ------ | -------- | ------------------------------ |
| `Content-Type`  | String | Yes      | Must be application/json       |
| `Authorization` | String | No       | Bearer JWT authorization token |

#### Parameters

| name | type | required | description         |
| ---- | ---- | -------- | ------------------- |
| `id` | Int  | Yes      | Id of specific user |

#### Response

##### 200 (OK)

> If you successfully delete one pokemon in backpack, the endpoint will return an HTTP response with a status code `200` and a body as below.

```
1
```

##### 401 (Unauthorized)

> If you are not logged in, then endpoint will return an HTTP response with a status code `401` and a body as below.

```
{
  "error": true,
  "message": "You are unathorized to view the content."
}
```

[Back to Table of Contents](#table-of-contents)

---

<!--
## **GET TOPICS**
### Gets an array of quiz topics

*Method Url:* `/api/quizzes/topics`

*HTTP method:* **[GET]**

#### Headers

| name           | type   | required | description              |
| -------------- | ------ | -------- | ------------------------ |
| `Content-Type` | String | Yes      | Must be application/json |

#### Response

##### 200 (OK)

```
[
  {
    "id": 2,
    "name": "JavaScript"
  }
]
```

---
## **ADD NEW QUIZ**
### Adds a new quiz

*Method Url:* `/api/quizzes`

*HTTP method:* **[POST]**

#### Headers

| name           | type   | required | description                    |
| -------------- | ------ | -------- | ------------------------------ |
| `Content-Type` | String | Yes      | Must be application/json       |
| `Authorization`| String | Yes      | Bearer JWT authorization token |

#### Body

| name     | type   | required | description              |
| ---------| ------ | -------- | ------------------------ |
| `title`  | String | Yes       |  |
| `topic`  | String | Yes       | Can be an existing or new topic |

*example:*
```
{
  title: "Array Methods",
  topic: "JavaScript"
}
```
#### Response

##### 200 (OK)
>If you successfully create a new quiz the endpoint will return an HTTP response with a status code `200` and a body as below.

```
[
  12
]
```

##### 400 (Bad Request)
>If you send in invalid fields, the endpoint will return an HTTP response with a status code `400` and a body as below.
```
{
  "error": true,
  "message": "There was a problem with your request."
}
```
##### 401 (Unauthorized)
>If you are not logged in, then endpoint will return an HTTP response with a status code `401` and a body as below.
```
{
  "error": true,
  "message": "You are unathorized to view the content."
}
```

---
## **EDIT SPECIFIC QUIZ**
### Edits one or more details of a specific quiz created by the current user.

*Method Url:* `/api/quizzes/:quizId/edit`

*HTTP method:* **[PATCH]**

#### Headers

| name           | type   | required | description                    |
| -------------- | ------ | -------- | ------------------------------ |
| `Content-Type` | String | Yes      | Must be application/json       |
| `Authorization`| String | Yes      | Bearer JWT authorization token |

#### Parameters

| name    | type   | required | description              |
| --------| ------ | -------- | ------------------------ |
| `quizId`| Int    | Yes      | Id of specific quiz |

#### Body

| name     | type   | required | description              |
| ---------| ------ | -------- | ------------------------ |
| `title`  | String | No       | New title of the quiz |
| `topic`  | String | No       | Can be a new or existing topic |



*Example:*

```
{
  "title": "Object Methods",
  "topic": "JavaScript II"
}
```

#### Response
##### 200 (OK)
>If the request if successful, the server will return an HTTP response with a status code `200` and the id of the updated quiz quiz.

```
[
  12
]
  ```

##### 400 (Bad Request)
>If you send in invalid fields, the endpoint will return an HTTP response with a status code `400` and a body as below.
```
{
  "error": true,
  "message": "There was a problem with your request."
}
```
##### 401 (Unauthorized)
>If you are not logged in, or you do not send in a token that matches the author of the quiz, the endpoint will return an HTTP response with a status code `401` and a body as below.
```
{
  "error": true,
  "message": "You are unathorized to view the content."
}
```

##### 404 (Not Found)
>If the quizId passed in does not match one in the database, the endpoint will return an HTTP response with a status code `404` and a body as below.
```
{
  "error": true,
  "message": "The requested content does not exist."
}
```
___
## **UPDATE QUIZ AND USER RELATIONSHIP**
### Edits the user specific information for a quiz, allowng users to favorite, vote for, and score.

*Method Url:* `/api/quizzes/:quizId`

*HTTP method:* **[PATCH]**

#### Headers

| name           | type   | required | description                    |
| -------------- | ------ | -------- | ------------------------------ |
| `Content-Type` | String | Yes      | Must be application/json       |
| `Authorization`| String | Yes      | Bearer JWT authorization token |

#### Parameters

| name    | type   | required | description              |
| --------| ------ | -------- | ------------------------ |
| `quizId`| Int    | Yes      | Id of specific quiz |

#### Body

| name     | type   | required | description              |
| ---------| ------ | -------- | ------------------------ |
| `vote`  | Int | No  | Default: 0. Must be -1, 0, 1 |
| `favorite` | Boolean | No   | Default: false.  |
| `score` | Int | No   | Default: 0. Cannot be larger than the amount of questions for the specified quiz.  |


*Example:*

```
{
  "vote": -1,
  "favorite": "true",
  "score": 3
}
```

#### Response
##### 200 (OK)
>If the request if successful, the server will return an HTTP response with a status code `200` and the id of the updated quiz user relationship.

```
[
  8
]
  ```
##### 400 (Bad Request)
>If you send in invalid fields, the endpoint will return an HTTP response with a status code `400` and a body as below.
```
{
  "error": true,
  "message": "There was a problem with your request."
}
```
##### 401 (Unauthorized)
>If you are not logged in, the endpoint will return an HTTP response with a status code `401` and a body as below.
```
{
  "error": true,
  "message": "You are unathorized to view the content."
}
```

##### 404 (Not Found)
>If the quizId passed in does not match one in the database, the endpoint will return an HTTP response with a status code `404` and a body as below.
```
{
  "error": true,
  "message": "The requested content does not exist."
}
```
_____
## **DELETE QUIZ**
### Deletes quiz with specific id.

*Method Url:* `/api/quizzes/:quizId`

*HTTP method:* **[DELETE]**

#### Headers

| name           | type   | required | description                    |
| -------------- | ------ | -------- | ------------------------------ |
| `Content-Type` | String | Yes      | Must be application/json       |
| `Authorization`| String | Yes      | Bearer JWT authorization token |

#### Parameters

| name    | type   | required | description              |
| --------| ------ | -------- | ------------------------ |
| `quizId`| Int    | Yes      | Id of specific quiz |


#### Response
##### 200 (OK)
>If the request if successful, the server will return an HTTP response with a status code `200` and the id of the deleted quiz user relationship.

```
[
  8
]
  ```

##### 401 (Unauthorized)
>If you are not logged in, or if the id of the logged in user does not match the author id of the quiz, the endpoint will return an HTTP response with a status code `401` and a body as below.
```
{
  "error": true,
  "message": "You are unathorized to view the content."
}
```

##### 404 (Not Found)
>If the quizId passed in does not match one in the database, the endpoint will return an HTTP response with a status code `404` and a body as below.
```
{
  "error": true,
  "message": "The requested content does not exist."
}
```
___

# QUESTION ROUTES

## **GET QUESTIONS**
### Gets all the questions in a quiz

*Method Url:* `/api/quizzes/:quizId/questions`

*HTTP method:* **[GET]**

#### Headers

| name           | type   | required | description                    |
| -------------- | ------ | -------- | ------------------------------ |
| `Content-Type` | String | Yes      | Must be application/json       |


#### Parameters

| name    | type   | required | description              |
| --------| ------ | -------- | ------------------------ |
| `quizId`| Int    | Yes      | Id of specific quiz |


#### Response

##### 200 (OK)
>If the request if successful, the server will return an HTTP response with a status code `200` and array of questions that have a quiz_id that matches the quizId passed in.

```
[
  {
    "id": 12,
    "question": "Here's a sample question 2",
    "options": [
      "sample option",
      "another 1",
      "This one is the answer shh don't tell",
      "yayyy"
    ]
  }
]
```

##### 404 (Not Found)
>If you pass in a quizId that does not match one in the database, the endpoint will return an HTTP response with a status code `404` and a body as below.
```
{
  "error": true,
  "message": "The requested content does not exist."
}
```
___

## **GET SPECIFIC QUESTION**
### Gets a question by its ID.

*Method Url:* `/api/quizzes/:quizId/questions/:questionId`

*HTTP Method:* **[GET]**

#### Headers

| name           | type   | required | description                    |
| -------------- | ------ | -------- | ------------------------------ |
| `Content-Type` | String | Yes      | Must be application/json       |


#### Parameters

| name    | type   | required | description              |
| --------| ------ | -------- | ------------------------ |
| `quizId`| Int    | Yes      | Id of specific quiz |
| `questionId`| Int    | Yes      | Id of specific question |

#### Response
##### 200 (OK)

>If the request if successful, the server will return an HTTP response with a status code `200` and the quiz object that matches the questionId and corresponding quizId passed in.

```
{
  "id": 12345,
  "question": "Here's a sample question 2",
  "options": [
    "sample option",
    "another 1",
    "This one is the answer shh don't tell",
    "yayyy"
  ],
  "quiz_id": 1
}
```

##### 404 (Not Found)
>If you pass in a quizId that does not match a quiz in the database, or a questionId that does not match a question associated with the passed in quizId, the endpoint will return an HTTP response with a status code `404` and a body as below.
```
{
  "error": true,
  "message": "The requested content does not exist."
}
```
___

## **GET SPECIFIC QUESTION ANSWER**
### Gets a response of whether the passed in option to a specific question by its ID is correct or not.

*Method Url:* `/api/quizzes/:quizId/questions/:questionId/response`

*HTTP Method:* **[GET]**

#### Headers

| name           | type   | required | description                    |
| -------------- | ------ | -------- | ------------------------------ |
| `Content-Type` | String | Yes      | Must be application/json       |


#### Parameters

| name    | type   | required | description              |
| --------| ------ | -------- | ------------------------ |
| `quizId`| Int    | Yes      | Id of specific quiz |
| `questionId`| Int    | Yes      | Id of specific question |
| `option` | Int | Yes       | Query parameter that matches an option # field on the specified question |

#### Response
##### 200 (OK)

>If the request if successful, the server will return an HTTP response with a status code `200` and the question id and boolean reflecting whether the option was correct or not.

```
{
    "question": 3,
    "correct": false
}
```

##### 400 (Bad Request)
>If you do not send in a required field, the endpoint will return an HTTP response with a status code `400` and a body as below.
```
{
  "error": true,
  "message": "There was a problem with your request."
}
```

##### 404 (Not Found)
>If you pass in a quizId that does not match a quiz in the database, or a questionId that does not match a question associated with the passed in quizId, the endpoint will return an HTTP response with a status code `404` and a body as below.
```
{
  "error": true,
  "message": "The requested content does not exist."
}
```
___

## **ADD NEW QUESTION**
### Adds a new question

*Method Url:* `/api/quizzes/:quizId/questions`

*HTTP method:* **[POST]**

#### Headers

| name           | type   | required | description                    |
| -------------- | ------ | -------- | ------------------------------ |
| `Content-Type` | String | Yes      | Must be application/json       |
| `Authorization`| String | Yes      | Bearer JWT authorization token |

#### Parameters

| name    | type   | required | description              |
| --------| ------ | -------- | ------------------------ |
| `quizId`| Int    | Yes      | Id of specific quiz |


#### Body

| name     | type   | required | description              |
| ---------| ------ | -------- | ------------------------ |
| `question`| String | Yes     | title of the question |
| `option1`| String | Yes     |  |
| `option2`| String | Yes     |  |
| `option3`| String | No     |  |
| `option4`| String | No    |  |
| `answer`  | Int | Yes      | Must be an integer that corresponds to an existing option number.  |

*Example:*

```
{
	"question": "Here's a sample question 2",
	"option1": "sample option",
	"option2": "another 1",
	"option3": "This one is the answer shh don't tell",
	"option4": "yayyy",
	"answer": 3
}
```

#### Response
##### 200 (OK)
>If the request if successful, the server will return an HTTP response with a status code `200` and the id of the new question as below.
```
[
  5
]
```
##### 400 (Bad Request)
>If you send in invalid fields, the endpoint will return an HTTP response with a status code `400` and a body as below.
```
{
  "error": true,
  "message": "There was a problem with your request."
}
```

##### 401 (Unauthorized)
>If you are not logged in, or if the id of the logged in user does not match the author id of the quiz, the endpoint will return an HTTP response with a status code `401` and a body as below.
```
{
  "error": true,
  "message": "You are unathorized to view the content."
}
```

##### 404 (Not Found)
>If the quizId passed in does not match one in the database, the endpoint will return an HTTP response with a status code `404` and a body as below.
```
{
  "error": true,
  "message": "The requested content does not exist."
}
```
___

## **EDIT A QUESTION**
### Edits a question of the specified id

*Method Url:* `/api/quizzes/:quizId/questions/:questionId`

*HTTP method:* **[PATCH]**

#### Headers

| name           | type   | required | description                    |
| -------------- | ------ | -------- | ------------------------------ |
| `Content-Type` | String | Yes      | Must be application/json       |
| `Authorization`| String | Yes      | Bearer JWT authorization token |

#### Parameters

| name    | type   | required | description              |
| --------| ------ | -------- | ------------------------ |
| `quizId`| Int    | Yes      | Id of specific quiz |
| `questionId`| Int    | Yes      | Id of specific question |


#### Body

| name     | type   | required | description              |
| ---------| ------ | -------- | ------------------------ |
| `question`| String | No     | title of the question |
| `option1`| String | No     |  |
| `option2`| String | No     |  |
| `option3`| String | No     |  |
| `option4`| String | No    |  |
| `answer`  | Int | No      | Must be an integer that corresponds to an existing option number.  |

*Example:*

```
{
	"question": "Here's a sample question 2",
	"option1": "sample option",
	"option2": "another 1",
	"option3": "This one is the answer shh don't tell",
	"option4": "yayyy",
	"answer": 4
}
```

#### Response
##### 200 (OK)
>If the request if successful, the server will return an HTTP response with a status code `200` and the id of the edited question.
```
[
  5
]
```
##### 400 (Bad Request)
>If you send in invalid fields, the endpoint will return an HTTP response with a status code `400` and a body as below.
```
{
  "error": true,
  "message": "There was a problem with your request."
}
```

##### 401 (Unauthorized)
>If you are not logged in, or if the id of the logged in user does not match the author id of the quiz, the endpoint will return an HTTP response with a status code `401` and a body as below.
```
{
  "error": true,
  "message": "You are unathorized to view the content."
}
```

##### 404 (Not Found)
>If the quizId or questionId passed in does not match one in the database, the endpoint will return an HTTP response with a status code `404` and a body as below.
```
{
  "error": true,
  "message": "The requested content does not exist."
}
```
___

## **DELETE QUESTION**
### Deletes question with specific id.

*Method Url:* `/api/quizzes/:quizId/questions/:questionId`

*HTTP method:* **[DELETE]**

#### Headers

| name           | type   | required | description                    |
| -------------- | ------ | -------- | ------------------------------ |
| `Content-Type` | String | Yes      | Must be application/json       |
| `Authorization`| String | Yes      | Bearer JWT authorization token |

#### Parameters

| name    | type   | required | description              |
| --------| ------ | -------- | ------------------------ |
| `quizId`| Int    | Yes      | Id of specific quiz |
| `questionId`| Int    | Yes      | Id of specific question |


#### Response
##### 200 (OK)
>If the request if successful, the server will return an HTTP response with a status code `200` and the id of the deleted question.

```
[
  8
]
  ```

##### 401 (Unauthorized)
>If you are not logged in, or if the id of the logged in user does not match the author id of the quiz, the endpoint will return an HTTP response with a status code `401` and a body as below.
```
{
  "error": true,
  "message": "You are unathorized to view the content."
}
```

##### 404 (Not Found)
>If the questionId or quizId passed in does not match one in the database, the endpoint will return an HTTP response with a status code `404` and a body as below.
```
{
  "error": true,
  "message": "The requested content does not exist."
}
```
___

# POST ROUTES

## **GET ALL POSTS**
### Gets an array of post objects

*Method Url:* `/api/posts`

*HTTP method:* **[GET]**

#### Headers

| name           | type   | required | description              |
| -------------- | ------ | -------- | ------------------------ |
| `Content-Type` | String | Yes      | Must be application/json |


#### Response

##### 200 (OK)

```
[
  {
    "id": 1,
    "title": "JavaScript n Things",
    "body": "Here's lots of stuff about JavaScript. So much about JavaScript. So many JavaScript things. All things JavaScript.",
    "created_at": "2018-12-11T04:47:28.998Z",
    "author": "dinolaur"
  }
]
```

___

## **GET ONE POST**
### Gets a post with the specified id

*Method Url:* `/api/posts/:postId`

*HTTP method:* **[GET]**

#### Headers

| name           | type   | required | description                    |
| -------------- | ------ | -------- | ------------------------------ |
| `Content-Type` | String | Yes      | Must be application/json       |
| `Authorization`| String | No       | Bearer JWT authorization token |

#### Parameters

| name    | type   | required | description              |
| --------| ------ | -------- | ------------------------ |
| `postId`| Int    | Yes      | Id of specific post |


#### Response

##### 200 (OK)

>If you send a valid post id, the endpoint will return an HTTP response with a status code `200` and a body as below.

```
{
  "id": 1,
  "title": "JavaScript n Things",
  "body": "Here's lots of stuff about JavaScript. So much about JavaScript. So many JavaScript things. All things JavaScript.",
  "author": {
    "id": 10,
    "username": "dinolaur",
    "img_url": "https://i.ytimg.com/vi/YCaGYUIfdy4/maxresdefault.jpg"
  },
  "created_at": "2018-12-11T04:47:28.998Z"
}
```

##### 404 (Not Found)
>If you pass in an id that does not match one in the database, the endpoint will return an HTTP response with a status code `404` and a body as below.
```
{
  "error": true,
  "message": "The requested content does not exist."
}
```
---
## **ADD NEW POST**
### Adds a new posts

*Method Url:* `/api/posts`

*HTTP method:* **[POST]**

#### Headers

| name           | type   | required | description                    |
| -------------- | ------ | -------- | ------------------------------ |
| `Content-Type` | String | Yes      | Must be application/json       |
| `Authorization`| String | Yes      | Bearer JWT authorization token |

#### Body

| name     | type   | required | description              |
| ---------| ------ | -------- | ------------------------ |
| `title`  | String | Yes       | |
| `body`  | String | Yes       |  |

*example:*
```
{
  title: "JavaScript n Things",
  body: "Here's lots of stuff about JavaScript. So much about JavaScript. So many JavaScript things. All things JavaScript."
}
```
#### Response

##### 200 (OK)
>If you successfully create a new post the endpoint will return an HTTP response with a status code `200` and a body as below.

```
[
  12
]
```

##### 400 (Bad Request)
>If you send in invalid fields, the endpoint will return an HTTP response with a status code `400` and a body as below.
```
{
  "error": true,
  "message": "There was a problem with your request."
}
```
##### 400 (Bad Request)
>If you send in invalid fields, the endpoint will return an HTTP response with a status code `400` and a body as below.
```
{
  "error": true,
  "message": "There was a problem with your request."
}
```
##### 401 (Unauthorized)
>If you are not logged in, then endpoint will return an HTTP response with a status code `401` and a body as below.
```
{
  "error": true,
  "message": "You are unathorized to view the content."
}
```

---
## **EDIT SPECIFIC POST**
### Edits one or more details of a specific post created by the current user.

*Method Url:* `/api/posts/:postId`

*HTTP method:* **[PATCH]**

#### Headers

| name           | type   | required | description                    |
| -------------- | ------ | -------- | ------------------------------ |
| `Content-Type` | String | Yes      | Must be application/json       |
| `Authorization`| String | Yes      | Bearer JWT authorization token |

#### Parameters

| name    | type   | required | description              |
| --------| ------ | -------- | ------------------------ |
| `postId`| Int    | Yes      | Id of specific post |

#### Body

| name     | type   | required | description              |
| ---------| ------ | -------- | ------------------------ |
| `title`  | String | No       | New title of the post |
| `body`  | String | No       | New body of post |



*Example:*

```
{
  "title": "JavaScript n Stuff",
  "body": "Some different things about JavaScript instead"
}
```

#### Response
##### 200 (OK)
>If the request if successful, the server will return an HTTP response with a status code `200` and the id of the updated post quiz.

```
[
  1
]
  ```

##### 400 (Bad Request)
>If you send in invalid fields, the endpoint will return an HTTP response with a status code `400` and a body as below.
```
{
  "error": true,
  "message": "There was a problem with your request."
}
```
##### 401 (Unauthorized)
>If you are not logged in, or you do not send in a token that matches the author of the post, the endpoint will return an HTTP response with a status code `401` and a body as below.
```
{
  "error": true,
  "message": "You are unathorized to view the content."
}
```

##### 404 (Not Found)
>If the postId passed in does not match one in the database, the endpoint will return an HTTP response with a status code `404` and a body as below.
```
{
  "error": true,
  "message": "The requested content does not exist."
}
```
___

## **DELETE POST**
### Deletes quiz with specific id.

*Method Url:* `/api/posts/:postId`

*HTTP method:* **[DELETE]**

#### Headers

| name           | type   | required | description                    |
| -------------- | ------ | -------- | ------------------------------ |
| `Content-Type` | String | Yes      | Must be application/json       |
| `Authorization`| String | Yes      | Bearer JWT authorization token |

#### Parameters

| name    | type   | required | description              |
| --------| ------ | -------- | ------------------------ |
| `postId`| Int    | Yes      | Id of specific post |


#### Response
##### 200 (OK)
>If the request if successful, the server will return an HTTP response with a status code `200` and the id of the post.

```
[
  8
]
  ```

##### 401 (Unauthorized)
>If you are not logged in, or if the id of the logged in user does not match the author id of the post, the endpoint will return an HTTP response with a status code `401` and a body as below.
```
{
  "error": true,
  "message": "You are unathorized to view the content."
}
```

##### 404 (Not Found)
>If the postId passed in does not match one in the database, the endpoint will return an HTTP response with a status code `404` and a body as below.
```
{
  "error": true,
  "message": "The requested content does not exist."
}
```
___
# COMMENT ROUTES

## **GET COMMENTS**
### Gets all the questions in a comments

*Method Url:* `/api/posts/:postId/comments`

*HTTP method:* **[GET]**

#### Headers

| name           | type   | required | description                    |
| -------------- | ------ | -------- | ------------------------------ |
| `Content-Type` | String | Yes      | Must be application/json       |


#### Parameters

| name    | type   | required | description              |
| --------| ------ | -------- | ------------------------ |
| `postId`| Int    | Yes      | Id of specific post |


#### Response

##### 200 (OK)
>If the request if successful, the server will return an HTTP response with a status code `200` and array of comments that have a post_id that matches the postId passed in.

```
[
  {
    "id": 4,
    "text": "sup family!",
    "author": "dinolaur",
    "post_id": 2,
    "created_at": "2018-12-13T03:24:27.215Z"
  }
]
```

##### 404 (Not Found)
>If you pass in a postId that does not match one in the database, the endpoint will return an HTTP response with a status code `404` and a body as below.
```
{
  "error": true,
  "message": "The requested content does not exist."
}
```
___

## **GET SPECIFIC COMMENT**
### Gets a comment by its ID.

*Method Url:* `/api/posts/:postId/comments/:commentId`

*HTTP Method:* **[GET]**

#### Headers

| name           | type   | required | description                    |
| -------------- | ------ | -------- | ------------------------------ |
| `Content-Type` | String | Yes      | Must be application/json       |


#### Parameters

| name    | type   | required | description              |
| --------| ------ | -------- | ------------------------ |
| `postId`| Int    | Yes      | Id of specific post |
| `commentId`| Int    | Yes      | Id of specific comment |

#### Response
##### 200 (OK)

>If the request if successful, the server will return an HTTP response with a status code `200` and the comment object that matches the commentId and corresponding postId passed in.

```
{
  "id": 4,
  "text": "sup family!",
  "author": {
    "id": 6,
    "username": "dinolaur",
    "img_url": null
  },
  "post_id": 2,
  "created_at": "2018-12-13T03:24:27.215Z"
}
```

##### 404 (Not Found)
>If you pass in a postId that does not match a post in the database, or a commentId that does not match a comment associated with the passed in postId, the endpoint will return an HTTP response with a status code `404` and a body as below.
```
{
  "error": true,
  "message": "The requested content does not exist."
}
```
___

## **ADD NEW COMMENT**
### Adds a new comment

*Method Url:* `/api/posts/:postId/comments`

*HTTP method:* **[POST]**

#### Headers

| name           | type   | required | description                    |
| -------------- | ------ | -------- | ------------------------------ |
| `Content-Type` | String | Yes      | Must be application/json       |
| `Authorization`| String | Yes      | Bearer JWT authorization token |

#### Parameters

| name    | type   | required | description              |
| --------| ------ | -------- | ------------------------ |
| `post`| Int    | Yes      | Id of specific quiz |


#### Body

| name     | type   | required | description              |
| ---------| ------ | -------- | ------------------------ |
| `text`| String | Yes     | text body of comment |


*Example:*

```
{
	text: "Sup family!"
}
```

#### Response
##### 200 (OK)
>If the request if successful, the server will return an HTTP response with a status code `200` and the id of the new question as below.
```
[
  5
]
```
##### 400 (Bad Request)
>If you send in invalid fields, the endpoint will return an HTTP response with a status code `400` and a body as below.
```
{
  "error": true,
  "message": "There was a problem with your request."
}
```

##### 401 (Unauthorized)
>If you are not logged in the endpoint will return an HTTP response with a status code `401` and a body as below.
```
{
  "error": true,
  "message": "You are unathorized to view the content."
}
```

##### 404 (Not Found)
>If the postId passed in does not match one in the database, the endpoint will return an HTTP response with a status code `404` and a body as below.
```
{
  "error": true,
  "message": "The requested content does not exist."
}
```
___
## **EDIT SPECIFIC COMMENT**
### Edits text of a specific commentcreated by the current user.

*Method Url:* `/api/posts/:postId/comments/:commentId`

*HTTP method:* **[PATCH]**

#### Headers

| name           | type   | required | description                    |
| -------------- | ------ | -------- | ------------------------------ |
| `Content-Type` | String | Yes      | Must be application/json       |
| `Authorization`| String | Yes      | Bearer JWT authorization token |

#### Parameters

| name    | type   | required | description              |
| --------| ------ | -------- | ------------------------ |
| `postId`| Int    | Yes      | Id of specific quiz |

#### Body

| name     | type   | required | description              |
| ---------| ------ | -------- | ------------------------ |
| `text`  | String | Yes       | New text of comment |



*Example:*

```
{
  title: "Hellurrr"
}
```

#### Response
##### 200 (OK)
>If the request if successful, the server will return an HTTP response with a status code `200` and the id of the updated quiz quiz.

```
[
  12
]
  ```

##### 400 (Bad Request)
>If you send in invalid fields, the endpoint will return an HTTP response with a status code `400` and a body as below.
```
{
  "error": true,
  "message": "There was a problem with your request."
}
```
##### 401 (Unauthorized)
>If you are not logged in the endpoint will return an HTTP response with a status code `401` and a body as below.
```
{
  "error": true,
  "message": "You are unathorized to view the content."
}
```

##### 404 (Not Found)
>If the postId or commentId passed in does not match one in the database, the endpoint will return an HTTP response with a status code `404` and a body as below.
```
{
  "error": true,
  "message": "The requested content does not exist."
}
```
___
## **DELETE COMMENT**
### Deletes comment with specific commentId.

*Method Url:* `/api/posts/:postId/comments/:commentId`

*HTTP method:* **[DELETE]**

#### Headers

| name           | type   | required | description                    |
| -------------- | ------ | -------- | ------------------------------ |
| `Content-Type` | String | Yes      | Must be application/json       |
| `Authorization`| String | Yes      | Bearer JWT authorization token |

#### Parameters

| name    | type   | required | description              |
| --------| ------ | -------- | ------------------------ |
| `postId`| Int    | Yes      | Id of specific post |
| `commentId`| Int    | Yes      | Id of specific comment |


#### Response
##### 200 (OK)
>If the request if successful, the server will return an HTTP response with a status code `200` and the id of the deleted question.

```
[
  8
]
  ```

##### 401 (Unauthorized)
>If you are not logged in, or if the id of the logged in user does not match the author id of the comment, the endpoint will return an HTTP response with a status code `401` and a body as below.
```
{
  "error": true,
  "message": "You are unathorized to view the content."
}
```

##### 404 (Not Found)
>If the commentId or postId passed in does not match one in the database, the endpoint will return an HTTP response with a status code `404` and a body as below.
```
{
  "error": true,
  "message": "The requested content does not exist."
} -->
