/**
 * @author locnt3
 */
import rest from '../transporter/rest';

export default class CollectionRestService {
	constructor({ service }) {
		this.service = service;
		this.client = rest.client;
	}

	find = (params) => this.client.service(this.service).find(params);

	get = (id, query) => this.client.service(this.service).get(id, query);

	create = (payload) => this.client.service(this.service).create(payload);

	delete = (id, params) => this.client.service(this.service).remove(id, params);

	update = (id, data) => this.client.service(this.service).update(id, data);

	patch = (id, data, params) => this.client.service(this.service).patch(id, data, params);
}
