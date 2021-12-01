import { combineReducers } from 'redux';
import place from './postalcode';

const rootReducer = combineReducers({
  place: place
});

export default rootReducer;