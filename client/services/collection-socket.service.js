/**
 * @author locnt3
 */
import socket from '../transporter/socket';

export default class CollectionSocketService {
	constructor({ service }) {
		this.service = service;
		this.provider = socket;
	}
	authenticate = (payload = null) => this.provider.client.authenticate(payload);

	logout = () => this.provider.client.logout();

	find = (params) => this.provider.emit('find', this.service, params);

	get = (id, query) => this.provider.emit('get', this.service, id, query);

	create = (payload) => this.provider.emit('create', this.service, payload);

	delete = (id, params) => this.provider.emit('remove', this.service, id, params);

	update = (id, data) => this.provider.emit('update', this.service, id, data);

	patch = (id, data, params) => this.provider.emit('patch', this.service, id, data, params);
}
