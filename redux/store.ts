import { createStore } from 'redux';
import ListReducer from './reducers/List';

const rootReducer = ListReducer;
const store = createStore(rootReducer);

export { store };
