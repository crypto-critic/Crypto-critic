import { observable, action, computed } from 'mobx';
import Rest from '../transporter/rest';
// import Socket from '../transporter/socket';
// import { UserStore } from '../stores';

import { authenticationConstants } from '../constants/global.constant';
const { AUTHENTICATED, UNAUTHENTICATED, IDLE_TIME } = authenticationConstants;

class SessionStoreInit {
    constructor() {
        this.restClient = Rest.client;
        // this.socketClient = Socket.client;
        this.initData();
    }

    @observable authenticationStatus;

    @observable user;

    @observable loginError;

    @action initData = () => {
        this.restClient.authenticate()
            .then((data) => {
                const { user } = data;
                Object.assign(this, { user });
                this.authenticationStatus = AUTHENTICATED;
            })
            .catch(() => {
                this.authenticationStatus = UNAUTHENTICATED;
                return;
            })
    }

    @action login = (query) => {
        return this.restClient.authenticate({
            strategy: 'local',
            ...query,
        }).then(data => {
            const { user } = data;
            Object.assign(this, { user });
            this.authenticationStatus = AUTHENTICATED;
        }).catch((err) => {
            this.setProperties({
                loginError: err,
            })
        });
    }
    
    @action logout = () => {
        this.restClient.logout();
        this.user = undefined;
        this.authenticationStatus = UNAUTHENTICATED;
    }

    @action handleChange = () => {
        this.setProperties({ loginError: {} })
    }

    @action setProperties = (newValue) => {
        Object.assign(this, newValue);
    }
}

const SessionStore = new SessionStoreInit();

export default SessionStore;
