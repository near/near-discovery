import { set } from 'lodash';

export default (buildStatusPath) => (state, action) =>
  set(state, [...buildStatusPath(action), 'status', 'error'], {
    message: action.error?.message || 'An error was encountered.',
    code: action.error?.code,
  });
