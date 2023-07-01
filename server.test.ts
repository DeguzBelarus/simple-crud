import http from 'http';

import { API_PREFIX } from './constants/constants';
import { IUser } from './types/types';

const emptyArray: Array<IUser> = [];

interface IGetAllUsersResponse {
  message: string;
  users?: Array<IUser>;
}

describe('API tests', () => {
  test('make a root GET request and get all users empty array', () => {
    http.get(`http://localhost${API_PREFIX}`, (response) => {
      response.on('data', (chunk) => {
        const data: IGetAllUsersResponse = JSON.parse(chunk.toString());
        expect(data.users).toStrictEqual(emptyArray);
      });
      response.on('error', (error) => {
        console.error(error);
      });
    });
  });
});
