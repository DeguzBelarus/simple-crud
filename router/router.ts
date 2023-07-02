import http from 'http';
import cluster from 'cluster';
import { cpus } from 'os';

import { RequestMethodsEnum } from '../types/types';
import { API_PREFIX } from '../constants/constants';
import { userController } from '../controllers/user-controller';
import { getFirstParam, getUrl } from './utils';

let currentWorker = 0;

cluster.on('response master controller data', (masterController) => {
  if (cluster.isWorker) {
    console.log('worker recieved controller');
    // userController = masterController;
  }
});

export const router = (
  request: http.IncomingMessage,
  response: http.ServerResponse<http.IncomingMessage> & {
    req: http.IncomingMessage;
  }
) => {
  const url = request.url;
  const method = request.method;
  const param = getFirstParam(url);

  const currentWorkerHandler = (prevWorkerCount: number) => {
    if (process.env.NODE_ENV === 'multi' && cluster.isPrimary) {
      if (prevWorkerCount + 1 > cpus().length - 1) {
        return 1;
      } else {
        return prevWorkerCount + 1;
      }
    } else {
      return prevWorkerCount;
    }
  };

  switch (getUrl(url)) {
    case API_PREFIX:
      currentWorker = currentWorkerHandler(currentWorker);
      console.log(currentWorker);
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
