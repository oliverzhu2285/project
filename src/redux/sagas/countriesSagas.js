import axios from 'axios';
import * as type from '../types';
import Urls from '../../config/config';
import { call, put, takeEvery } from 'redux-saga/effects';

const onCallReqeust = async (URI) =>
  await axios
    .get(URI)
    .then((res) => res)
    .catch((error) => error);

function* fetchCountries({payload}) {
   try {
      const response = yield call(onCallReqeust, Urls.countriesApiUrl);
      yield put({type: type.CONTRIES_SUCCESS, countries: response.data});
   } catch (e) {
      yield put({type: type.CONTRIES_FAILED, message: e.message});
   }
}

function* countriesSagas() {
   yield takeEvery(type.GET_CONTRIES_REQUESTED, fetchCountries);
}

export default countriesSagas;