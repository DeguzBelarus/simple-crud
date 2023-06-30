export enum RequestMethodsEnum {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export type Undefinable<T> = T | undefined;
export type Nullable<T> = T | null;

export interface IUser {
  id: string;
  username: string;
  age: number;
  hobbies: Array<string>;
}

export interface IAddUserRequestData {
  username: string;
  age: number;
  hobbies: Array<string>;
}
