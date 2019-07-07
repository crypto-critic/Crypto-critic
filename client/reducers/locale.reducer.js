import { localeConstants } from '../constants';

const initialState = {
    locale: 'US'
};

export function locale(state = initialState, action) {
    if (action.type === localeConstants.CHANGE_LOCALE) {
        state.locale = action.locale;
    }
    return state;
}