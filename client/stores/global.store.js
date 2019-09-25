import { observable, action, computed, observe } from 'mobx';
import { getValueFromLocalStorage, setValueToLocalStorage } from '../services/localStorage.service';
import { languageDefinition, moneyDefinition, themeDefinition } from '../config';

const { languages, defaultLanguage } = languageDefinition;
const { moneys, defaultMoney } = moneyDefinition;
const { themes, defaultTheme } = themeDefinition;

class GlobalStoreInit {
    constructor() {
        this.getValueFromLocalStorage = getValueFromLocalStorage;
        this.setValueToLocalStorage = setValueToLocalStorage;
        this.moneys = moneys;
        this.languages = languages;
        this.initData();
        observe(this, 'language', ({ newValue }) => this.loadCatalog({ language: newValue }))
    }

    @observable money;

    @observable language;

    @observable theme;

    @observable catalogs = {};

    @action initData = () => {
        let money = this.getValueFromLocalStorage('money') || defaultMoney;
        let language = this.getValueFromLocalStorage('language') || defaultLanguage;
        let theme = this.getValueFromLocalStorage('theme') || defaultTheme;
        this.setLocalStorage({ key: 'language', value: language });
        this.setLocalStorage({ key: 'money', value: money });
        this.setLocalStorage({ key: 'theme', value: theme });
        this.loadCatalog();
    }

    @action set = (newValue) => {
        Object.assign(this, newValue);
    }
    
    @action setLocalStorage = ({ key, value }) => {
        Object.assign(this, { [key]: value });
        this.setValueToLocalStorage({ key, value });
    }

    @action loadCatalog = ({ language } = { language: 'en' }) => {
        const catalog = import(
            /* webpackMode: "lazy", webpackChunkName: "i18n-[index]" */
            `@lingui/loader!../locales/${language}/messages.json`
            )
            console.log('catalog: ', catalog);
        Object.assign(this.catalogs, { [this.language]: catalog })
    }
}

const GlobalStore = new GlobalStoreInit();

export default GlobalStore;
