import { observable, action, computed, observe } from 'mobx';
import { getUserInfo } from '../services/user.service';
import SessionStore from '../stores/session.store';
import { authorizationKey } from '../endpoints';

class UserStore {
    constructor() {
        this.getUserInfo = getUserInfo;
        this.fetchData();
    }

    @observable email = '';

    @observable firstName = '';

    @observable lastName = '';

    @observable avartar = '';

    @observable dateCreated;

    @computed get authenticationStatus() {
        return SessionStore.authenticationStatus;
    }

    @computed get authorizationHeader() {
        return {
            [authorizationKey]: SessionStore.token
        }
    }

    @action fetchData = () => {
        const headers = {
            [authorizationKey]: SessionStore.token
        }
        this.getUserInfo(headers).then(({ data }) => {
            const { email, firstName, lastName, avartar, dateCreated } = data;
            console.log('firstName: ', firstName);
            console.log('email: ', email);
        });       
    }

    @action set = ({ newValue }) => {
        Object.assign(this, { newValue });
    }
}

const AppUserStore = new UserStore();

export default AppUserStore;
