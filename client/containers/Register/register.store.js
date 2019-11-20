import { observable, action, computed } from 'mobx';
import { observer } from 'mobx-react';
import { userService } from '../../services/user.service';

class RegisterStore {
    constructor() {
        this.userService = userService;
    }

    @observable registerStatus = undefined;

    @observable confirmDirty = false;

    @observable message = {};

    @action register = (user) => {
        this.userService.create(user).then((result) => {
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
    }
}

const AppRegisterStore = new RegisterStore();

export default AppRegisterStore;