import { moneyConstants } from '../constants';

const initialState = {money: 'USD'};

export function money(state = initialState, action) {
    if (action.type === moneyConstants.CHANGE_MONEY) {
        state.money = action.money
    }
    return state;
}