import { Application, Request, Response } from 'express';
import * as express from 'express';
import * as methodOverride from 'method-override';
import * as helmet from 'helmet';
import VisitorSockets from './socket/visitors';
import * as cors from 'cors';
import { corsOptions } from './corsOption';
import { visitorSockets } from './subcribers';

import { createServer } from 'http';
import { Server } from 'socket.io';

const app = express();

const http = createServer(app);
const io = new Server(http);

const port = process.env.PORT || 3030;

app.use(
	helmet({
		contentSecurityPolicy: false,
		crossOriginResourcePolicy: { policy: 'cross-origin' },
		crossOriginEmbedderPolicy: true,
		noSniff: true,
		xssFilter: true,
		hidePoweredBy: true,
	}),
);
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
	res.json({ message: 'hey', sockets: visitorSockets.visitors });
});

io.of('/websocket/visitor').on('connection', (socket) => {
	if (!app.request.io) {
		app.request.io = io;
	}

	VisitorSockets(app.request, socket);
});

async function startServer() {
	await new Promise((resolve) =>
		http.listen({ port: process.env.PORT || 3030 }),
	)
		.then(() => {
			console.log(`Connected successfully on port ${port}`);
			return { app };
		})

		.catch(() => {
			return { app };
		});
}

startServer();
