import dotenv from 'dotenv';
import http from 'http';
import { cpus } from 'os';
import cluster from 'cluster';

import { router } from './router/router';
const numCPUs = cpus().length;
let SidePort = 0;

dotenv.config();
const PORT = Number(process.env.PORT) || 4000;
export const server = http.createServer(router);

if (process.env.NODE_ENV !== 'multi') {
  server.listen(PORT, () => {
    if (process.env.NODE_ENV === 'production') {
      console.log(`Server has been started on port ${PORT}...`);
    } else {
      console.log(`Server has been started on port ${PORT} in development mode...`);
    }
  });
} else {
  if (cluster.isPrimary) {
    for (let i = 0; i < numCPUs - 1; i++) {
      cluster.fork();
    }
    server.listen(PORT, () => {
      console.log(`Server has been started on port ${PORT} in development mode...`);
    });
  } else {
    SidePort = Number(cluster.worker?.id) + PORT;
    server.listen(SidePort, () => {
      console.log(`Side server has been started on port ${SidePort} in development mode...`);
      if (Number(cluster.worker?.id) === numCPUs - 1 && cluster.isWorker) {
        console.log('all workers are ready');
        cluster.worker?.send({ msg: 'request master controller data' });
      }
    });
  }
}
