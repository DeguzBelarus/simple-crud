import dotenv from 'dotenv';
import http from 'http';

import { router } from './router/router';

dotenv.config();
const PORT = process.env.PORT || 4000;
export const server = http.createServer(router);

server.listen(PORT, () => {
  if (process.env.NODE_ENV === 'production') {
    console.log(`Server has been started on port ${PORT}...`);
  } else {
    console.log(`Server has been started on port ${PORT} in development mode...`);
  }
});
