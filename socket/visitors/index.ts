import { Request } from 'express';
import { Socket } from 'socket.io';
import { visitorSocketsT, visitorSockets } from '../../subcribers';

export default function ArduinoSocket(req: Request, socketGlobal: Socket) {
	console.log(`A user with id: ${socketGlobal.id} has connected`);
	// console.log(arduinoSockets);
	visitorSockets.addSocket({
		socketId: socketGlobal.id,
	});
	// req.arduinoSockets = arduinoSockets;

	socketGlobal.on(
		'setSelf',
		async (self: {
			nama_lengkap: string;
			level: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
			status: 'orang-tua' | 'saudara';
			id: string;
		}) => {
			const socket = visitorSockets.visitors.find(
				(sck) => sck.socketId == socketGlobal.id,
			);

			socket?.setSelf({
				userId: self.id,
				nama_lengkap: self.nama_lengkap,
				level: self.level,
				status: 'siswa',
			});
			req.io
				.of('/websocket/visitor')
				.emit(
					'visitorNumbers',
					visitorSockets.visitors.filter((visitor) => visitor.user).length,
				);

			req.io.of('/websocket/visitor').emit(
				'visitors',
				visitorSockets.visitors.filter((visitor) => visitor.user),
			);
		},
	);

	socketGlobal.on(
		'subscribe.cursor',
		async (position: { x: number; y: number }, e: any, p: any) => {
			//   console.log(socket.id, data, e, p);
			const socket = visitorSockets.visitors.find(
				(sck) => sck.socketId == socketGlobal.id,
			);

			socket?.subscribeCursor(position);
		},
	);

	socketGlobal.on('error', (err) => {
		console.log(
			`A socket user with socket id: ${socketGlobal.id} has disconnected`,
		);
		const socket = visitorSockets.visitors.find(
			(sck) => sck.socketId == socketGlobal.id,
		);

		// console.log(socket, req.arduinoSockets);

		if (socket) {
			visitorSockets.visitors = visitorSockets.visitors.filter(
				(socket) => socket.socketId != socketGlobal.id,
			);

			req.io
				.of('/websocket/visitor')
				.emit(
					'visitorNumbers',
					visitorSockets.visitors.filter((visitor) => visitor.user).length,
				);

			req.io.of('/websocket/visitor').emit(
				'visitors',
				visitorSockets.visitors.filter((visitor) => visitor.user),
			);
			// console.log(req.arduinoSockets);
			//   console.log(arduinoSockets);
		}
	});

	socketGlobal.on('disconnect', () => {
		console.log(
			`A socket user with socket id: ${socketGlobal.id} has disconnected`,
		);
		const socket = visitorSockets.visitors.find(
			(sck) => sck.socketId == socketGlobal.id,
		);

		// console.log(socket, req.arduinoSockets);

		if (socket) {
			visitorSockets.visitors = visitorSockets.visitors.filter(
				(socket) => socket.socketId != socketGlobal.id,
			);

			req.io
				.of('/websocket/visitor')
				.emit(
					'visitorNumbers',
					visitorSockets.visitors.filter((visitor) => visitor.user).length,
				);

			req.io.of('/websocket/visitor').emit(
				'visitors',
				visitorSockets.visitors.filter((visitor) => visitor.user),
			);
		}
	});
}
