import dotenv from 'dotenv';
import http from 'http';

import { router } from './router/router';

dotenv.config();
const PORT = process.env.PORT || 4000;
const server = http.createServer(router);

server.listen(PORT, () => {
  console.log(`Server has been started on port ${PORT}...`);
});
