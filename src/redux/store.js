import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import errorModalReducers from './reducers/errorModalReducers';
import transactionSubmitReducers from './reducers/transactionSubmitReducers'
import transactionStatusReducers from './reducers/transactionStatusReducers'
const rootReducer = combineReducers({ errorModalReducers, transactionSubmitReducers, transactionStatusReducers });

export const Store = createStore(rootReducer, applyMiddleware(thunk));
