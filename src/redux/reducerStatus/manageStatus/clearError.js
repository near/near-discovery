import { set } from 'lodash';

import initialErrorState from '../initialState/initialErrorState';

export default (buildStatusPath) => (state, action) =>
  set(state, [...buildStatusPath(action), 'status', 'error'], initialErrorState);
