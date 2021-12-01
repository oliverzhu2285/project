import { all } from 'redux-saga/effects'
import postalcodeSagas from './postalcodeSagas';

export default function* rootSaga() {
  yield all([
    postalcodeSagas(),
  ])
}