import { observable, action, computed } from 'mobx';
import { observer } from 'mobx-react';
import { registerService } from '../../services/authentication.service';

class RegisterStore {
    constructor() {
        this.registerService = registerService;
    }

    @observable user = {
        name: '',
        email: '',
        password: '',
        password_confirm: ''
    };

    @observable submitted = false;

    @observable registerStatus = false;

    @action register = async (user) => {
        this.user = user;
        this.submitted = true;
        let result = await this.registerService(user);
        if (result.name) {
            this.registerStatus = true;
        }
    }

    @action setProperties = () => {
        Object.assign(this, )
    }
}

const AppRegisterStore = new RegisterStore();

export default AppRegisterStore;