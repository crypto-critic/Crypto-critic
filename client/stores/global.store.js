import { observable, action, computed, observe } from 'mobx';
import { getValueFromLocalStorage, setValueToLocalStorage } from '../services/localStorage.service';
import { languageDefinition, moneyDefinition, themeDefinition } from '../config';

const { languages, defaultLanguage } = languageDefinition;
const { moneys, defaultMoney } = moneyDefinition;
const { themes, defaultTheme } = themeDefinition;

class GlobalStore {
    constructor() {
        this.getValueFromLocalStorage = getValueFromLocalStorage;
        this.setValueToLocalStorage = setValueToLocalStorage;
        this.moneys = moneys;
        this.localeProviderLanguages = [];
        this.initData();
        observe(this, 'languageListen', this.loadCatalog());
    }

    @observable money;

    @observable language;

    @observable theme;

    @observable catalog;
    
    @computed get languageListen() {
        return this.language;
    }


    @action initData = async () => {
        let money = this.getValueFromLocalStorage('money') || defaultMoney;
        let language = this.getValueFromLocalStorage('language') || defaultLanguage;
        let theme = this.getValueFromLocalStorage('theme') || defaultTheme;
        this.setLocalStorage({ key: 'language', value: language });
        this.setLocalStorage({ key: 'money', value: money });
        this.setLocalStorage({ key: 'theme', value: theme });
        await languages.forEach(item => {
            this.localeProviderLanguages.push({
                [item.linguiKey]: import(`antd/es/locale/${item.localeProviderKey}`)
            })
        });
        this.loadCatalog();
    }

    @action set = (newValue) => {
        Object.assign(this, newValue);
    }
    
    @action setLocalStorage = ({ key, value }) => {
        Object.assign(this, { [key]: value });
        this.setValueToLocalStorage({ key, value });
    }

    @action loadCatalog = () => {
        const { language, set } = this;
        const catalog = import(`../locales/${language}/messages.json`);
        set({
            catalog: { [language]: catalog }
        })
    }
}

const AppGlobalStore = new GlobalStore();

export default AppGlobalStore;
