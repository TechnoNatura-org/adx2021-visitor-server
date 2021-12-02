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
			statusVisitor:
				| 'Mentor'
				| 'Siswa'
				| 'Orang Tua'
				| 'Lainnya'
				| 'Saudara'
				| '';
			levelSiswa: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
			namaPengunjung: string;
			namaLengkapSiswa: string;
			id: string;
			nama: string;

			genderSiswa?: string;
			genderPengunjung?: string;
		}) => {
			const socket = visitorSockets.visitors.find(
				(sck) => sck.socketId == socketGlobal.id,
			);

			socket?.setSelf(self);
			req.io
				.of('/websocket/visitor')
				.emit(
					'visitorNumbers',
					visitorSockets.visitors.filter(
						(visitor) => visitor.user?.statusVisitor,
					).length,
				);

			req.io.of('/websocket/visitor').emit(
				'visitors',
				visitorSockets.visitors.filter(
					(visitor) => visitor.user?.statusVisitor,
				),
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
					visitorSockets.visitors.filter(
						(visitor) => visitor.user?.statusVisitor,
					).length,
				);

			req.io.of('/websocket/visitor').emit(
				'visitors',
				visitorSockets.visitors.filter(
					(visitor) => visitor.user?.statusVisitor,
				),
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
					visitorSockets.visitors.filter(
						(visitor) => visitor.user?.statusVisitor,
					).length,
				);

			req.io.of('/websocket/visitor').emit(
				'visitors',
				visitorSockets.visitors.filter(
					(visitor) => visitor.user?.statusVisitor,
				),
			);
		}
	});
}
