import http from 'http';
import { validate as uuidValidate } from 'uuid';

import { IUser } from '../types/types';

export class UserController {
  users: Array<IUser> = [];

  async getUsers(
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

  async getOneUser(
    id: string,
    request: http.IncomingMessage,
    response: http.ServerResponse<http.IncomingMessage> & {
      req: http.IncomingMessage;
    }
  ) {
    if (!uuidValidate(id)) {
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
}

export const userController = new UserController();
