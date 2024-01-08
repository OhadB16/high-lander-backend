import express from 'express';
import http from 'http';
import cors from 'cors';
import { Server as SocketIOServer } from 'socket.io';
import goalRoutes from './routes/goalRoutes';
import { handleConnection } from './services/socketHandlers';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', goalRoutes);

const server = http.createServer(app);
const io = new SocketIOServer(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

io.on('connection', handleConnection);

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
