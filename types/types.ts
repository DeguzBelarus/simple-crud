export interface IUser {
  id: number;
  username: string;
  age: number;
  hobbies: Array<string>;
}

export class User implements IUser {
  id: number;
  username: string;
  age: number;
  hobbies: string[];
  constructor(id: number, username: string, age: number, hobbies: Array<string>) {
    this.id = id;
    this.username = username;
    this.age = age;
    this.hobbies = hobbies;
  }
}

export enum RequestMethodsEnum {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}
