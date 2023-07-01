import request from 'supertest';

import { server } from './server';
import { API_PREFIX } from './constants/constants';
import { IUser } from './types/types';

interface IGetAllUsersResponse {
  message: string;
  users?: Array<IUser>;
}

interface IAddUsersResponse {
  message: string;
  userData?: IUser;
}

interface IUpdateUsersResponse {
  message: string;
  updatedUserData?: IUser;
}

const postData: IUser = {
  username: 'user',
  age: 20,
  hobbies: ['fishing', 'shopping'],
};

const putData: IUser = {
  username: 'user2',
  age: 30,
  hobbies: ['gym'],
};

describe('API tests', () => {
  test('make a root GET request and get all users empty array', async () => {
    const emptyArray: Array<IUser> = [];
    const response = await request(server).get(API_PREFIX);
    const responseData = response.body as IGetAllUsersResponse;
    expect(responseData.users).toStrictEqual(emptyArray);
  });

  test('make a POST request and get the added user in response', async () => {
    const response = await request(server).post(API_PREFIX).send(postData);
    const responseData = response.body as IAddUsersResponse;
    expect(responseData.userData).toStrictEqual({ ...postData, id: responseData.userData?.id });
  });

  test('make a PUT request and get the updated user in response', async () => {
    const postResponse = await request(server).post(API_PREFIX).send(postData);
    const postResponseData = postResponse.body as IAddUsersResponse;

    const putResponse = await request(server)
      .put(`${API_PREFIX}${postResponseData.userData?.id}`)
      .send(putData);
    const putResponseData = putResponse.body as IUpdateUsersResponse;
    expect(putResponseData.updatedUserData).toStrictEqual({
      ...putData,
      id: postResponseData.userData?.id,
    });
  });
});
