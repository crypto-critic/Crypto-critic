import { observable, action, computed } from 'mobx';
import { observer } from 'mobx-react';
import { registerService } from '../../services/authentication.service';

class RegisterStore {
    constructor() {
        this.registerService = registerService;
    }

    @observable registerStatus = undefined;

    @observable confirmDirty = false;

    @observable message = {};

    @action register = (user) => {
        this.registerService(user).then((result) => {
            if (result.status === 'success') {
                this.registerStatus = 'success';
            } else {
                this.registerStatus = 'error';
            }
            return this.message = result;
        });
    }

    @action setProperties = (newValue) => {
        Object.assign(this, newValue)
        console.log('setproperties', newValue)
    }
}

const AppRegisterStore = new RegisterStore();

export default AppRegisterStore;