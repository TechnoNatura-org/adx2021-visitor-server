"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.visitorSockets = void 0;
class visitorSocketClass {
    constructor(socketId, position) {
        this.socketId = socketId;
        if (position) {
            this.position = {
                x: position === null || position === void 0 ? void 0 : position.x,
                y: position.y,
            };
        }
    }
    subscribeCursor(position) {
        this.position = position;
    }
    setSelf(user) {
        this.user = user;
    }
}
let totalArray = [];
for (let i = 0; i < 12; i++) {
    totalArray.push([]);
}
class visitorSocketsClass {
    constructor() {
        this.visitors = [];
    }
    addSocket(item) {
        const newSocket = new visitorSocketClass(item.socketId, item.position);
        this.visitors.push(newSocket);
    }
    sendDatas(req, sensorId, data, dateAdded, id) {
        // this.rooms.forEach((socket) => {
        // 	// if (socket.subscribe.datas.includes(String(sensorId))) {
        // 	console.log('socket.socketId', socket.socketId);
        // req.io
        // 	.of('/websocket/visitor')
        // 	.to(socket.socketId)
        // 	.emit('visitor.sensor.datas', {
        // 		sensorId: sensorId,
        // 		data: data,
        // 		dateAdded: dateAdded,
        // 		id: id,
        // 	});
        // }
        // });
    }
}
exports.visitorSockets = new visitorSocketsClass();
