"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function SocketMain(socket) {
    console.log('A user has connected');
    socket.on('disconnect', () => {
        console.log('A user has disconnected');
    });
}
exports.default = SocketMain;
