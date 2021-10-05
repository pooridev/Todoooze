import { compose, createStore } from 'redux';
import projectReducer from './reducers/project';

const rootReducer = projectReducer;

const enhancers = compose(
  typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__
    ? window.devToolsExtension()
    : f => f
);
export const store = createStore(rootReducer, enhancers);
