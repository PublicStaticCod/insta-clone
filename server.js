import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import Pusher from 'pusher';
import dbModel from './dbModel.js';

// app config

const app = express();
const port = process.env.PORT || 8080;

const pusher = new Pusher({
	appId: '1078083',
	key: 'cdb63ed34a544275f43b',
	secret: 'ac87043ecbd5f3e2b892',
	cluster: 'ap2',
	useTLS: true,
});

pusher.trigger('my-channel', 'my-event', {
	message: 'hello world',
});

// middlewares

app.use(express.json());
app.use(cors());

// db config
const connection_url =
	'mongodb+srv://admin:nf85LN1oQJEXrisA@cluster0.8csmq.mongodb.net/instaDB?retryWrites=true&w=majority';

mongoose.connect(connection_url, {
	useCreateIndex: true,
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

mongoose.connection.once('open', () => {
	console.log('DB CONNECTED');

	const changeStream = mongoose.connection.collection('post').watch();

	changeStream.on('change', (change) => {
		console.log('change triggered. on pusher...');
		console.log(change);
		console.log('End of Change');

		if (change.operationType === 'insert') {
			console.log('Trigger Pusher  ***IMG UPLOAD***');

			const postDetails = change.fullDocument;
			pusher.trigger('posts', 'inserted', {
				user: postDetails.user,
				caption: postDetails.caption,
				image: postDetails.image,
			});
		} else {
			console.log('Error triggering Pusher');
		}
	});
});

// api router
app.get('/', (req, res) => res.status(200).send('HELLO BACKEND SERVER '));

app.post('/upload', (req, res) => {
	const body = req.body;

	dbModel.create(body, (err, data) => {
		if (err) {
			res.status(500).send(err);
		} else {
			res.status(201).send(data);
		}
	});
});

app.get('/sync', (req, res) => {
	dbModel.find((err, data) => {
		if (err) {
			res.status(500).send(err);
		} else {
			res.status(200).send(data);
		}
	});
});

// listner

app.listen(port, () => console.log(`listening on localhost: ${port}`));
