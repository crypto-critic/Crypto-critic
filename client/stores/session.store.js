import { observable, action, computed } from 'mobx';
import {
    getValueFromLocalStorage,
    setValueToLocalStorage,
    removeKeyFromLocalStorage
} from '../services/localStorage.service';
import { loginService } from '../services/authentication.service';
import { authorizationKey } from '../endpoints';
import { authenticationConstants } from '../constants/globalConstants';
import { UserStore } from '../stores';

const { AUTHENTICATED, UNAUTHENTICATED, IDLE_TIME } = authenticationConstants;

class SessionStoreInit {
    constructor() {
        this.getValueFromLocalStorage = getValueFromLocalStorage;
        this.setValueToLocalStorage = setValueToLocalStorage;
        this.removeKeyFromLocalStorage = removeKeyFromLocalStorage;
        this.loginService = loginService;
        this.initData();
    }

    @observable authenticationStatus = UNAUTHENTICATED;

    @observable token = '';

    @observable loginMessage = {};

    @computed get isIdle() {
        let idleTime = Number(this.getValueFromLocalStorage('actionTime')) + IDLE_TIME;
        return idleTime && idleTime > Date.now()
    }

    @action initData = () => {
        this.token = this.getValueFromLocalStorage(authorizationKey);
        if (this.token && this.isIdle) {
            this.authenticationStatus = AUTHENTICATED;
            return;
        }
        this.logout();
    }

    @action login = async (query) => {
        this.loginService(query).then(user => {
            if (user.status === 'error') {
                return this.loginMessage = user;
            }            
            if (user && user.token) {
                this.token = user.token
                this.setValueToLocalStorage({key: 'actionTime', value: Date.now() });
                this.setValueToLocalStorage({key: authorizationKey, value: user.token});
                this.authenticationStatus = AUTHENTICATED;
            }
        });
    }
    
    @action logout = () => {
        Object.assign(this, {
            authenticationStatus: UNAUTHENTICATED,
            token: '',
        })
        this.removeKeyFromLocalStorage(authorizationKey);
    }

    @action resetActionTime = () => {
        this.setValueToLocalStorage('actionTime', Date.now());
    }
}

const SessionStore = new SessionStoreInit();

export default SessionStore;
