import { observable, action, computed, observe } from 'mobx';
import GlobalStore from '../../stores/global.store';
import { getCoinPageData } from '../../services/coinPage.service';

class CoinPageStore {
    constructor(id) {
        this.id = id;
        this.getCoinPageData = getCoinPageData;
        this.initData(this.id);
    }

    @observable loading = false;

    @observable coinPageData;

    @action initData = () => {
        this.setProperties({ loading: true })
        this.getCoinPageData(this.id).then(result => {
            this.coinPageData = result;
            this.setProperties({ loading: false })
        })
    }

    @action setProperties = (newValue) => {
        Object.assign(this, newValue);
    }
}

export default CoinPageStore;