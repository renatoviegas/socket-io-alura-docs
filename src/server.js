import express from 'express';
import url from 'url';
import path from 'path';
import http from 'http';
import { Server } from 'socket.io';
import { configDotenv } from 'dotenv';
import { connectDatabase } from './dbConnect.js';

configDotenv();

const dbConfig = {
  dbUser: process.env.DB_USER,
  dbPass: process.env.DB_PASSWORD,
  dbPath: process.env.DB_PATH,
  dbName: process.env.DB_NAME
};

connectDatabase(dbConfig);

const app = express();
const port = process.env.PORT || 3001;

const currentPath = url.fileURLToPath(import.meta.url);
const publicDir = path.join(currentPath, '../..', 'public');

app.use(express.static(publicDir));

const httpServer = http.createServer(app);

httpServer.listen(port, () => {
  console.log(`Server listener on port ${port}`);
});

const io = new Server(httpServer);

export default io;