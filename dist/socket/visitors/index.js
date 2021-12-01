"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const subcribers_1 = require("../../subcribers");
function ArduinoSocket(req, socketGlobal) {
    console.log(`A user with id: ${socketGlobal.id} has connected`);
    // console.log(arduinoSockets);
    subcribers_1.visitorSockets.addSocket({
        socketId: socketGlobal.id,
    });
    // req.arduinoSockets = arduinoSockets;
    socketGlobal.on('setSelf', async (self) => {
        const socket = subcribers_1.visitorSockets.visitors.find((sck) => sck.socketId == socketGlobal.id);
        socket === null || socket === void 0 ? void 0 : socket.setSelf({
            userId: self.id,
            nama_lengkap: self.nama_lengkap,
            level: self.level,
            status: 'siswa',
        });
        req.io
            .of('/websocket/visitor')
            .emit('visitorNumbers', subcribers_1.visitorSockets.visitors.filter((visitor) => visitor.user).length);
    });
    socketGlobal.on('subscribe.cursor', async (position, e, p) => {
        //   console.log(socket.id, data, e, p);
        const socket = subcribers_1.visitorSockets.visitors.find((sck) => sck.socketId == socketGlobal.id);
        socket === null || socket === void 0 ? void 0 : socket.subscribeCursor(position);
    });
    socketGlobal.on('error', (err) => {
        console.log(`A socket user with socket id: ${socketGlobal.id} has disconnected`);
        const socket = subcribers_1.visitorSockets.visitors.find((sck) => sck.socketId == socketGlobal.id);
        // console.log(socket, req.arduinoSockets);
        if (socket) {
            subcribers_1.visitorSockets.visitors = subcribers_1.visitorSockets.visitors.filter((socket) => socket.socketId != socketGlobal.id);
            // console.log(req.arduinoSockets);
            //   console.log(arduinoSockets);
        }
    });
    socketGlobal.on('disconnect', () => {
        console.log(`A socket user with socket id: ${socketGlobal.id} has disconnected`);
        const socket = subcribers_1.visitorSockets.visitors.find((sck) => sck.socketId == socketGlobal.id);
        // console.log(socket, req.arduinoSockets);
        if (socket) {
            subcribers_1.visitorSockets.visitors = subcribers_1.visitorSockets.visitors.filter((socket) => socket.socketId != socketGlobal.id);
            req.io
                .of('/websocket/visitor')
                .emit('visitorNumbers', subcribers_1.visitorSockets.visitors.filter((visitor) => visitor.user).length);
        }
    });
}
exports.default = ArduinoSocket;
