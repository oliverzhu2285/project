import axios from 'axios';
import * as type from '../types';
import Urls from '../../config/config';
import { call, put, takeEvery } from 'redux-saga/effects';

const onCallReqeust = async (URI) =>
  await axios
    .get(URI)
    .then((res) => res)
    .catch((error) => error);

function* fetchUniversities({payload}) {
   try {
      const response = yield call(onCallReqeust, `${Urls.universitiesApiUrl}${payload.country}`);
      yield put({type: type.UNIVERSITIES_SUCCESS, universities: response.data});
   } catch (e) {
      yield put({type: type.UNIVERSITIES_FAILED, message: e.message});
   }
}

function* universitiesSagas() {
   yield takeEvery(type.GET_UNIVERSITIES_REQUESTED, fetchUniversities);
}

export default universitiesSagas;