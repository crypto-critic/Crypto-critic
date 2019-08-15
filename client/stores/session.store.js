import { observable, action, computed } from 'mobx';
import {
    getValueFromLocalStorage,
    setValueToLocalStorage,
    removeKeyFromLocalStorage
} from 'services/localStorage.service';
import { login, logout } from 'services/authentication.service';
import { authorizationKey } from 'endpoints/endpoints'

const IDLE_TIME = 300000; // 5 minutes

class SessionStore {
    constructor() {
        this.getValueFromLocalStorage = getValueFromLocalStorage;
        this.setValueToLocalStorage = setValueToLocalStorage;
        this.removeKeyFromLocalStorage = removeKeyFromLocalStorage;
        this.loginService = login;
        this.initData();
    }

    @observable loginStatus = 'UNAUTHENTICATED';

    @observable token = '';

    @computed get isIdle() {
        let idleTime = Number(this.getValueFromLocalStorage('actionTime')) + IDLE_TIME;
        return idleTime && idleTime > Date.now()
    }

    @action initData = () => {
        this.token = this.getValueFromLocalStorage(authorizationKey);
        if (this.token && this.isIdle) {
            this.loginStatus = 'AUTHENTICATED';
            return;
        }
        this.logout();
    }

    @action login = async (email, password) => {
        let user = await this.loginService(email, password);
        if (user && user.token) {
            Object.assign(this, {
                loginStatus: 'AUTHENTICATED',
                token: user.token
            })
            this.setValueToLocalStorage('actionTime', Date.now());
            this.setValueToLocalStorage('Cryptocritic_token', user.token);
        }
    }
    
    @action logout = () => {
        Object.assign(this, {
            loginStatus: 'UNAUTHENTICATED',
            token: '',
        })
        this.removeKeyFromLocalStorage(authorizationKey);
    }

    @action resetActionTime = () => {
        this.setValueToLocalStorage('actionTime', Date.now());
    }
}

const AppSessionStore = new SessionStore();

export default AppSessionStore;
