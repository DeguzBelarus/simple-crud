import dotenv from 'dotenv';
import http from 'http';

import { IUser } from './types/types';
import { router } from './router/router';

dotenv.config();
const PORT = process.env.PORT || 4000;
const usersData: Array<IUser> = [];

const server = http.createServer(router);

server.listen(PORT, () => {
  console.log(`Server has been started on port ${PORT}...`);
});
