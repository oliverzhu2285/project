import { combineReducers } from 'redux';
import universities from './universities';
import countries from './countries';

const rootReducer = combineReducers({
  universities: universities,
  countries: countries
});

export default rootReducer;