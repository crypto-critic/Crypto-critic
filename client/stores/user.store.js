import { observable, action, computed, observe } from 'mobx';
import { getUserInfo } from '../services/user.service';
import SessionStore from '../stores/session.store';
import { authorizationKey } from '../endpoints';
import { authenticationConstants } from '../constants/global.constant';

const { AUTHENTICATED, UNAUTHENTICATED } = authenticationConstants;

class UserStoreInit {
    static initialState = {
        email: '',
        firstName: '',
        lastName: '',
        avartar: '',
        createdAt: undefined,
        role: undefined
    }

    constructor() {
        this.getUserInfo = getUserInfo;
        this.initData();
        observe(this, 'authenticationStatus', ({ newValue }) => {
            if (newValue === AUTHENTICATED) {
                return this.fetchData()
            }
            return this.resetData();            
        })
    }

    @observable email;

    @observable firstName;

    @observable lastName;

    @observable avartar;

    @observable createdAt;

    @observable role;

    @computed get authenticationStatus() {
        return SessionStore.authenticationStatus || UNAUTHENTICATED;
    }

    @computed get authorizationHeader() {
        return {
            [authorizationKey]: SessionStore.token
        }
    }

    @action initData = () => {
        if (this.authenticationStatus === AUTHENTICATED) {
            return this.fetchData();
        }
        this.resetData();
    }

    @action fetchData = () => {
        this.getUserInfo(this.authorizationHeader).then(data => {
            const { email, firstName, lastName, avartar, dateCreated, role } = data;
            this.setProperties({
                email,
                firstName,
                lastName,
                avartar,
                dateCreated,
                role
            })    
        });
    }

    @action resetData = () => {
        this.setProperties(UserStoreInit.initialState);
    }

    @action setProperties = (newValue) => {
        Object.assign(this, newValue);
    }
}

const UserStore = new UserStoreInit();

export default UserStore;
