import { userConstants } from '../constants';

const initialState = {};

export function authentication(state = initialState, action) {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return {
        state: 'REQUEST',
        email: action.email,
        token: null
      };
    case userConstants.LOGIN_SUCCESS:
      return {
        state: 'SUCCESS',
        email: action.email,
        token: action.token
      };
    case userConstants.LOGIN_FAILURE:
      return {
        state: 'FAILURE',
        error: action.error,
        token: null
      };
    case userConstants.LOGOUT:
      return {
        state: 'LOGOUT',
        email: null,
        token: null,
      };
    default:
      return state
  }
}