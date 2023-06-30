import http from 'http';
import { validate as uuidValidate, v4 as uuidV4 } from 'uuid';

import { IAddUserRequestData, IUser, Nullable, Undefinable } from '../types/types';

class User implements IUser {
  id: string;
  username: string;
  age: number;
  hobbies: string[];
  constructor(id: string, username: string, age: number, hobbies: Array<string>) {
    this.id = id;
    this.username = username;
    this.age = age;
    this.hobbies = hobbies;
  }
}

export class UserController {
  users: Array<IUser> = [];

  getUsers(
    request: http.IncomingMessage,
    response: http.ServerResponse<http.IncomingMessage> & {
      req: http.IncomingMessage;
    }
  ) {
    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.write(
      JSON.stringify({ message: 'Users data was successfully received', users: this.users })
    );
    response.end();
  }

  getOneUser(
    id: Nullable<string>,
    request: http.IncomingMessage,
    response: http.ServerResponse<http.IncomingMessage> & {
      req: http.IncomingMessage;
    }
  ) {
    if (!uuidValidate(id || '')) {
      response.writeHead(400, { 'Content-Type': 'application/json' });
      response.write(JSON.stringify({ message: 'Invalid uuid' }));
      response.end();
    } else {
      const foundUser = this.users.find((user) => user.id === id);
      if (foundUser) {
        response.writeHead(200, { 'Content-Type': 'application/json' });
        response.write(
          JSON.stringify({ message: 'User data was successfully received', userData: foundUser })
        );
        response.end();
      } else {
        response.writeHead(404, { 'Content-Type': 'application/json' });
        response.write(JSON.stringify({ message: `User with id ${id} was not found` }));
        response.end();
      }
    }
  }

  addUser(
    request: http.IncomingMessage,
    response: http.ServerResponse<http.IncomingMessage> & {
      req: http.IncomingMessage;
    }
  ) {
    const requestBodyBuffer: Array<Uint8Array> = [];
    let body: Undefinable<IAddUserRequestData>;
    request.on('data', (chunks) => {
      requestBodyBuffer.push(chunks);
    });
    request.on('end', () => {
      try {
        body = JSON.parse(Buffer.concat(requestBodyBuffer).toString());
        if (!body?.age || !body?.hobbies || !body?.username) {
          response.writeHead(400, { 'Content-Type': 'application/json' });
          response.write(JSON.stringify({ message: 'Insufficient data to add a new user' }));
          response.end();
        } else {
          if (
            typeof body.username !== 'string' ||
            typeof body.age !== 'number' ||
            !Array.isArray(body.hobbies) ||
            !body.hobbies.every((hobbyName) => typeof hobbyName === 'string')
          ) {
            response.writeHead(400, { 'Content-Type': 'application/json' });
            response.write(JSON.stringify({ message: 'Incorrect data to add a new user' }));
            response.end();
          } else {
            const newUser = new User(uuidV4(), body.username, body.age, body.hobbies);
            this.users = [...this.users, newUser];
            response.writeHead(201, { 'Content-Type': 'application/json' });
            response.write(
              JSON.stringify({ message: 'The user was successfully added', userData: newUser })
            );
            response.end();
          }
        }
      } catch (error) {
        if (error instanceof Error) {
          response.writeHead(400, { 'Content-Type': 'application/json' });
          response.write(JSON.stringify({ message: error.message }));
          response.end();
        }
      }
    });
  }

  updateUser(
    id: Nullable<string>,
    request: http.IncomingMessage,
    response: http.ServerResponse<http.IncomingMessage> & {
      req: http.IncomingMessage;
    }
  ) {
    const requestBodyBuffer: Array<Uint8Array> = [];
    let body: Undefinable<IAddUserRequestData>;
    request.on('data', (chunks) => {
      requestBodyBuffer.push(chunks);
    });
    request.on('end', () => {
      try {
        body = JSON.parse(Buffer.concat(requestBodyBuffer).toString());
        if (!uuidValidate(id || '')) {
          response.writeHead(400, { 'Content-Type': 'application/json' });
          response.write(JSON.stringify({ message: 'Invalid uuid' }));
          response.end();
        } else {
          const foundUserIndex = this.users.findIndex((user) => user.id === id);
          if (foundUserIndex === -1) {
            response.writeHead(404, { 'Content-Type': 'application/json' });
            response.write(JSON.stringify({ message: `User with id ${id} was not found` }));
            response.end();
          } else {
            if (!body?.age && !body?.hobbies && !body?.username) {
              response.writeHead(400, { 'Content-Type': 'application/json' });
              response.write(JSON.stringify({ message: 'Insufficient data to update the user' }));
              response.end();
            } else {
              if (
                (body.username && typeof body.username !== 'string') ||
                (body.age && typeof body.age !== 'number') ||
                (body.hobbies && !Array.isArray(body.hobbies)) ||
                (body.hobbies && !body.hobbies.every((hobbyName) => typeof hobbyName === 'string'))
              ) {
                response.writeHead(400, { 'Content-Type': 'application/json' });
                response.write(JSON.stringify({ message: 'Incorrect data to update the user' }));
                response.end();
              } else {
                this.users[foundUserIndex] = {
                  age: body.age || this.users[foundUserIndex].age,
                  username: body.username || this.users[foundUserIndex].username,
                  hobbies: body.hobbies || this.users[foundUserIndex].hobbies,
                  id: this.users[foundUserIndex].id,
                };
                response.writeHead(200, { 'Content-Type': 'application/json' });
                response.write(
                  JSON.stringify({
                    message: 'The user was successfully updated',
                    updatedUserData: this.users[foundUserIndex],
                  })
                );
                response.end();
              }
            }
          }
        }
      } catch (error) {
        if (error instanceof Error) {
          response.writeHead(400, { 'Content-Type': 'application/json' });
          response.write(JSON.stringify({ message: error.message }));
          response.end();
        }
      }
    });
  }
}

export const userController = new UserController();
