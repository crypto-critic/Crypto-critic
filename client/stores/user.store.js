import { observable, action, computed, observe } from 'mobx';
import { getUserInfo } from 'services/user.service';
import SessionStore from 'stores/session.store';
import { authorizationKey } from '../endpoints';

class UserStore {
    constructor() {
        this.getUserInfo = getUserInfo;
        observe(this, 'loginStatus', async () => {
            const info = await this.getUserInfo(this.authorizationHeader);
            this.set(info);
        })
    }

    @observable email = '';

    @observable firstName = '';

    @observable lastName = '';

    @observable avartar = '';

    @observable dateCreated;

    @computed get loginStatus() {
        return SessionStore.loginStatus;
    }

    @computed get authorizationHeader() {
        return {
            [authorizationKey]: SessionStore.token
        }
    }

    @action set = ({ newValue }) => {
        Object.assign(this, { newValue });
    }
}

const AppUserStore = new UserStore();

export default AppUserStore;
