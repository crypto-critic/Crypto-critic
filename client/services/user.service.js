import CollectionRestService from './collection-rest.service';
import { USERS } from '../constants/services.constant';

export const userService = new CollectionRestService({ service: USERS });
