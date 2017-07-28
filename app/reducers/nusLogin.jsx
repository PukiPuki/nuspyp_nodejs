import * as types from '../types';

const fetchModList = (
  state = {},
  action
) => {
  switch (action.type) {
    case types.FETCH_MODULE_LIST:
      return action.modList;
		default:
			return state;
	}
};

const validate = (
  state = {},
  action
) => {
  switch (action.type) {
    case types.VALIDATE:
      return action.success;
		default:
			return state;
	}
};

export default getUser,fetchModList, validate;
