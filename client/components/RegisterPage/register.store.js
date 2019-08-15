import { observable, action, computed } from 'mobx';
import { observer } from 'mobx-react';
import { register } from '../../services/authentication.service';

class RegisterStore {
    constructor() {
        this.registerService = register;
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

    @action setUser = (name, value) => {
        this.user = {
            ...this.user,
            [name]: value
        };
    }

    @action setSubmitted = (state) => {
        this.submitted = state;
    }

}

const AppRegisterStore = new RegisterStore();

export default AppRegisterStore;