import { moneyConstants } from '../constants';

export const moneyActions = {
    changeMoney,
};

function changeMoney(money) {
    return { type: moneyConstants.CHANGE_MONEY, money: money};
}
