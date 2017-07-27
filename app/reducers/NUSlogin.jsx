import * as types from '../types';

const NUSLogin = (
  state = {},
  action
) => {
  switch (action.type) {
    case types.LOGIN_SUCCESS_USER:
      return action.data;
		default:
			return state;
	}
};

export default NUSLogin;
