import feathers from '@feathersjs/feathers';
import socketio from '@feathersjs/socketio-client';
import io from 'socket.io-client';
import auth from '@feathersjs/authentication-client';
import { appConfig, authConfig } from '../config';

class Socket {
	constructor() {
		this.client = feathers();
		this.endpoint = `http://${appConfig.host}:${appConfig.port}`;
		this.client.configure(auth(authConfig));
		this.socket = io(this.endpoint);
		this.client.configure(socketio(this.socket));
		this.client.handleSocket(this.socket, () => {
			
		})
	}
	emit = (event, service, ...rest) => new Promise((resolve, reject) => {
		this.socket.emit(event, service, ...rest, function (error, data){
			if (error) { reject(error) };
			resolve(data);
		})
	})
}

export default new Socket();

