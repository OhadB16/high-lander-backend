"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const socket_io_1 = require("socket.io");
const goalRoutes_1 = __importDefault(require("./routes/goalRoutes"));
const socketHandlers_1 = require("./services/socketHandlers");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/api', goalRoutes_1.default);
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});
io.on('connection', socketHandlers_1.handleConnection);
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
