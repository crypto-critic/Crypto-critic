/**
 * @author locnt3
 */
import feathers from './http';

export class CollectionService {
	constructor({ service }) {
		this.service = service;
		this.client = feathers.client;
	}

	find = (params) => this.client.service(this.service).find(params);

	get = (id, query) => this.client.service(this.service).get(id, query);

	create = (payload) => this.client.service(this.service).create(payload);

	delete = (id, params) => this.client.service(this.service).remove(id, params);

	update = (id, data) => this.client.service(this.service).update(id, data);

	patch = (id, data, params) => this.client.service(this.service).patch(id, data, params);
}
