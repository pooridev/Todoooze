import { createWrapper } from 'next-redux-wrapper';
import { createStore, compose } from 'redux';
import projectReducer from './reducers/project';

const rootReducer = projectReducer;

const composeEnhancers =
  // @ts-ignore
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? // @ts-ignore
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : // @ts-ignore
      compose;

const enhancer = composeEnhancers();

const makeStore = () => createStore(rootReducer, enhancer);

export const wrapper = createWrapper(makeStore);
