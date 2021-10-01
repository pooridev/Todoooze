import { createStore } from 'redux';
import ListReducer from './reducers/Tasks';

const rootReducer = ListReducer;
const store = createStore(rootReducer);

export { store };
