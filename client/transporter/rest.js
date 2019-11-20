/**
 * @author pinokara
 */
import feathers from '@feathersjs/feathers';
import rest from '@feathersjs/rest-client';
import AuthManagement from 'feathers-authentication-management/lib/client';
import auth from '@feathersjs/authentication-client';
import axios from 'axios';
import { appConfig, authConfig } from '../config';

class Rest {
	constructor() {
		this.minValidity = appConfig.token.minValidity;
		this.client = feathers();
		this.endpoint = `http://${appConfig.host}:${appConfig.port}`;
		this.rest = rest(this.endpoint);
		this.client.configure(this.rest.axios(axios));
		this.client.configure(auth(authConfig));
	}
}

export default new Rest();
