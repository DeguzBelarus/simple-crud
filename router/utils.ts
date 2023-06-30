import { Nullable, Undefinable } from '../types/types';

export const getUrl = (url: Undefinable<string>): string => {
  return `${url?.split('/').slice(0, 3).join('/')}/`;
};

export const getFirstParam = (url: Undefinable<string>): Nullable<string> => {
  return url ? url.split('/')[3] : null;
};
