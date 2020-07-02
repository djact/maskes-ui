import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import globalModals from '../components/global-modals/login/login-modal.reducers';
import auth from '../apis/auth/auth.reducers';
import reducerFromRootFolder from '../components/root/reducer/reducer';

const appReducers = combineReducers({
  nav: reducerFromRootFolder,
  auth,
  globalModals,
});

const store = createStore(appReducers, applyMiddleware(logger, thunk));
export default store;
