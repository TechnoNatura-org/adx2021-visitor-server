"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const methodOverride = require("method-override");
const helmet = require("helmet");
const visitors_1 = require("./socket/visitors");
const subcribers_1 = require("./subcribers");
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const app = express();
const http = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(http);
const port = process.env.PORT || 3030;
app.use(helmet({
    contentSecurityPolicy: false,
    crossOriginResourcePolicy: { policy: 'cross-origin' },
    crossOriginEmbedderPolicy: true,
    noSniff: true,
    xssFilter: true,
    hidePoweredBy: true,
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));
app.use(methodOverride('_method'));
app.use(express.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});
app.use(function (req, res, next) {
    req.io = io;
    next();
});
app.get('/', (req, res) => {
    req.io.of('/websocket').sockets.forEach((socket) => {
        //   console.log(socket);
    });
    res.json({ message: 'hey', sockets: subcribers_1.visitorSockets.visitors });
});
io.of('/websocket/visitor').on('connection', (socket) => {
    if (!app.request.io) {
        app.request.io = io;
    }
    (0, visitors_1.default)(app.request, socket);
});
async function startServer() {
    await new Promise((resolve) => http.listen({ port: process.env.PORT || 3030 }))
        .then(() => {
        console.log(`Connected successfully on port ${port}`);
        return { app };
    })
        .catch(() => {
        return { app };
    });
}
startServer();
