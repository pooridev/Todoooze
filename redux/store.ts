import { compose, createStore } from 'redux';
import projectReducer from './reducers/project';

const rootReducer = projectReducer;

let composeEnhancers = compose;
if (typeof window !== 'undefined') {
  composeEnhancers = window?.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}


export const store = createStore(rootReducer, composeEnhancers());
