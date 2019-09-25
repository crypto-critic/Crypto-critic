/**
 * @author pinokara
 */
import feathers from '@feathersjs/feathers';
import rest from '@feathersjs/rest-client';
import auth from '@feathersjs/authentication-client';
import axios from 'axios';
import { appConfig, authConfig } from '../config';

class Http {
	constructor() {
		this.minValidity = appConfig.token.minValidity;
		this.client = feathers();
		this.endpoint = `http://${appConfig.host}:${appConfig.port}`;
		this.restClient = rest(this.endpoint);
		this.client.configure(this.restClient.axios(axios));
		this.client.configure(auth(authConfig));
		this.client.hooks({
			before: {
				all: [],
				find: [],
				get: [],
				create: [],
				update: [],
				patch: [],
				remove: []
			},

			after: {
				all: [],
				find: [],
				get: [],
				create: [],
				update: [],
				patch: [],
				remove: []
			},

			error: {
				all: [],
				find: [],
				get: [],
				create: [],
				update: [],
				patch: [],
				remove: []
			}
		});
	}
}

export default new Http();
