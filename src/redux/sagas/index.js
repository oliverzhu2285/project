import { all } from 'redux-saga/effects'
import universitiesSagas from './universitiesSagas';
import countriesSagas from './countriesSagas';

export default function* rootSaga() {
  yield all([
    universitiesSagas(),
    countriesSagas()
  ])
}