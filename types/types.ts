export interface IUser {
  id: string;
  username: string;
  age: number;
  hobbies: Array<string>;
}

export class User implements IUser {
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

export enum RequestMethodsEnum {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}
