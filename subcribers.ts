import { Server } from 'socket.io';
import { Request } from 'express';

export interface visitorPosition {
	x: number;
	y: number;
}
export type visitorSocketT = {
	socketId: string;
	position?: visitorPosition;
};
export type userT = {
	nama_lengkap: string;
	level: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
	status: 'orang-tua' | 'saudara' | 'siswa' | 'teman';
	userId: string;
};

export type visitorSocketsT = Array<visitorSocketT>;

export type socketSubscribeT = {
	visitorNumbers: boolean;
	visitors: boolean;
};

class visitorSocketClass {
	public socketId: string;
	public position?: visitorPosition;
	public user?: userT;
	public subscribe?: socketSubscribeT;
	constructor(socketId: string, position?: visitorPosition) {
		this.socketId = socketId;

		if (position) {
			this.position = {
				x: position?.x,
				y: position.y,
			};
		}
	}

	public subscribeCursor(position: visitorPosition) {
		this.position = position;
	}

	public setSelf(user: userT) {
		this.user = user;
	}
}

let totalArray: Array<Array<visitorSocketClass>> = [];

for (let i = 0; i < 12; i++) {
	totalArray.push([]);
}

class visitorSocketsClass {
	public visitors: Array<visitorSocketClass> = [];

	constructor() {}

	public addSocket(item: visitorSocketT): void {
		const newSocket = new visitorSocketClass(item.socketId, item.position);
		this.visitors.push(newSocket);
	}

	public sendDatas(
		req: Request,
		sensorId: string,
		data: string | number,
		dateAdded: number,
		id: string,
	) {
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

	// public sendSensorRealtimeDataToSocket(
	//   req: Request,
	//   sensorId: string,
	//   data: string | number,
	//   dateAdded: number,
	// ) {
	//   this.visitorSockets.forEach((socket) => {
	//     if (socket.subscribe.realtimeData.includes(String(sensorId))) {
	//       console.log('socket.socketId', socket.socketId);
	//       req.io
	//         .of('/websocket/visitor')
	//         .to(socket.socketId)
	//         .emit('visitor.sensor.realtimeData', {
	//           sensorId: sensorId,
	//           data: data,
	//           dateAdded: dateAdded,
	//         });
	//     }
	//   });
	// }
}

export let visitorSockets = new visitorSocketsClass();
