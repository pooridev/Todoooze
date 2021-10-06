import { createWrapper } from 'next-redux-wrapper';
import { createStore, compose } from 'redux';
import projectReducer from './reducers/project';

const rootReducer = projectReducer;

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers();

const makeStore = () => createStore(rootReducer, enhancer);

export const wrapper = createWrapper(makeStore);
