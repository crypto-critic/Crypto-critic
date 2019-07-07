import { localeConstants } from '../constants';

export const localeActions = {
    changeLocale,
};

function changeLocale(locale) {
    return { type: localeConstants.CHANGE_LOCALE, locale: locale};
}
