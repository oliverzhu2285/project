import axios from 'axios';
import * as type from '../types';
import Urls from '../../config/config';
import { call, put, takeEvery } from 'redux-saga/effects';

const onCallReqeust = async (URI) =>
  await axios
    .get(URI)
    .then((res) => res)
    .catch((error) => error);

function* fetchPlace({payload}) {
   try {
      console.log(payload)
      const response = yield call(onCallReqeust, `${Urls.postalLookUpsApiUrl}${payload.country}/${payload.code}`);
      yield put({type: type.PLACE_SUCCESS, place: response.data});
   } catch (e) {
      yield put({type: type.PLACE_FAILED, message: e.message});
   }
}

function* countriesSagas() {
   yield takeEvery(type.GET_PLACE_REQUESTED, fetchPlace);
}

export default countriesSagas;