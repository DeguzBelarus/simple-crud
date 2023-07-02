# simple crud

## .env config (create a file with name .env and content)

- `PORT=4000` - port number can be any other (number)

## main scripts

- `start:dev` - runs the server in development mode

- `start:prod` - makes a server build and runs the server in production mode

- `server:build` - makes a server build

- `test` - runs all tests (the server must be turned off in this moment)

- `start:multi` - runs the server in development mode with a load balancer

## main interfaces

`IUser {
id?: string;
username: string;
age: number;
hobbies: string[];
}`

`IAddUserRequestData {
username: string;
age: number;
hobbies: string[];
}`

`IUpdateUserRequestData {
username?: string;
age?: number;
hobbies?: string[];
}`

## main server routes (endpoints) at localhost:4000 (or other port number)

### GET

- `/api/users/`

headers: none
query params: none
params: none

`on success (status code 200)`:
responses with JSON:
users: IUser[],
message: string

- `/api/users/:userId`

headers: none
query params: none
params: userId: uuid

`on success (status code 200)`:
responses with JSON:
userData: IUser,
message: string

`on fail (bad request data - status code 400)`:
responses with JSON:
message: string

`on fail (user was not found - status code 404)`:
responses with JSON:
message: string

### POST

- `/api/users/`

headers: 'Content-Type': 'application/json
query params: none
params: none
body: JSON of `IAddUserRequestData` interface

`on success (status code 201)`:
responses with JSON:
userData: IUser,
message: string

`on fail (bad request data - status code 400)`:
responses with JSON:
message: string

`on fail (server error - status code 500)`:
responses with JSON:
message: string

### PUT

- `/api/users/:userId`

headers: 'Content-Type': 'application/json
query params: none
params: userId: uuid
body: JSON of `IUpdateUserRequestData` interface

`on success (status code 200)`:
responses with JSON:
updatedUserData: IUser,
message: string

`on fail (bad request data - status code 400)`:
responses with JSON:
message: string

`on fail (user was not found - status code 404)`:
responses with JSON:
message: string

`on fail (server error - status code 500)`:
responses with JSON:
message: string

### DELETE

- `/api/users/:userId`

headers: none
query params: none
params: userId: uuid

`on success (status code 204)`:
responses without any data, only with status code 204

`on fail (bad request data - status code 400)`:
responses with JSON:
message: string

`on fail (user was not found - status code 404)`:
responses with JSON:
message: string

### UNHANDLED ROUTE

responses with JSON:
message: string
