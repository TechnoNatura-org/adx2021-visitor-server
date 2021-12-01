if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}

import * as cors from 'cors';

// cors.
var whitelist = [
	'https://adx2021.technonatura.id',
	'https://tn-adx2021.vercel.app',
];

if (process.env.NODE_ENV == 'dev') {
	whitelist.push(
		'exp://127.0.0.1:19000',
		'http://127.0.0.1:5000/',
		'http://localhost:3000',
		'http://localhost:3010',
	);
}

var corsOptions: cors.CorsOptions = {
	origin: function (origin, callback) {
		// console.log(process.env.NODE_ENV);
		if (process.env.NODE_ENV !== 'dev') {
			console.log('origin', origin);
			if (origin && whitelist.indexOf(origin) !== -1) {
				callback(null, true);
			} else {
				callback(new Error('Not allowed by CORS'));
			}
		} else {
			callback(null, true);
		}
	},
	credentials: true,
};

export { corsOptions };
