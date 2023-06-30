import http from 'http';

import { RequestMethodsEnum } from '../types/types';
import { API_PREFIX } from '../constants/constants';
import { userController } from '../controllers/user-controller';
import { getFirstParam, getUrl } from './utils';

export const router = (
  request: http.IncomingMessage,
  response: http.ServerResponse<http.IncomingMessage> & {
    req: http.IncomingMessage;
  }
) => {
  const url = request.url;
  const method = request.method;
  const param = getFirstParam(url);

  switch (getUrl(url)) {
    case API_PREFIX:
      switch (method) {
        case RequestMethodsEnum.GET:
          !param
            ? userController.getUsers(request, response)
            : userController.getOneUser(param, request, response);
          break;
        case RequestMethodsEnum.POST:
          userController.addUser(request, response);
          break;
        case RequestMethodsEnum.PUT:
          userController.updateUser(param, request, response);
          break;
        case RequestMethodsEnum.DELETE:
          userController.deleteUser(param, request, response);
      }
      break;
    default:
      response.writeHead(404, { 'Content-Type': 'application/json' });
      response.write(JSON.stringify({ message: "This route doesn't exist" }));
      response.end();
  }
};
