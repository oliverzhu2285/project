import axios from 'axios';
import * as type from '../types';
import Urls from '../../config/config';
import { call, put, takeEvery } from 'redux-saga/effects';

const onCallReqeust = async (URI) =>
  await axios
    .get(URI)
    .then((res) => res)
    .catch((error) => error);
const onPostCallReqeust = async (sendData, URI) =>
  await axios
    .post(URI, sendData)
    .then((res) => res)
    .catch((error) => error);
const onPutCallReqeust = async (sendData, URI) =>
  await axios
    .put(URI, sendData)
    .then((res) => res)
    .catch((error) => error);
const onDeleteCallReqeust = async (URI) =>
  await axios
    .delete(URI)
    .then((res) => res)
    .catch((error) => error);

function* fetchPosts(action) {
   try {
      const response = yield call(onCallReqeust, `${Urls.postsApiUrl}/posts`);
      yield put({type: type.POSTS_SUCCESS, posts: response.data, update: false});
   } catch (e) {
      yield put({type: type.POSTS_FAILED, message: e.message});
   }
}

function* fetchPostById({ payload }) {
   try {
      const response = yield call(onCallReqeust, `${Urls.postsApiUrl}/posts/${payload.id}`);
      yield put({type: type.POSTS_SUCCESS, post: response.data, update: false});
   } catch (e) {
      yield put({type: type.POSTS_FAILED, message: e.message});
   }
}

function* createPost({ payload }) {
   try {
      const response = yield call(onPostCallReqeust, {body: payload.post} , `${Urls.postsApiUrl}/posts`);
      yield put({type: type.POSTS_SUCCESS, post: response.data.body, update: true});
   } catch (e) {
      yield put({type: type.POSTS_FAILED, message: e.message});
   }
}

function* updatePost({ payload }) {
   try {
      const response = yield call(onPutCallReqeust, {body: payload.post} , `${Urls.postsApiUrl}/posts/${payload.id}`);
      yield put({type: type.POSTS_SUCCESS, post: response.data.body, update: true});
   } catch (e) {
      yield put({type: type.POSTS_FAILED, message: e.message});
   }
}

function* deletePost({ payload }) {
   try {
      const response = yield call(onDeleteCallReqeust,  `${Urls.postsApiUrl}/posts/${payload.id}`);
      yield put({type: type.POSTS_SUCCESS, post: response.data, update: true});
   } catch (e) {
      yield put({type: type.POSTS_FAILED, message: e.message});
   }
}

function* userSaga() {
   yield takeEvery(type.GET_POSTS_REQUESTED, fetchPosts);
   yield takeEvery(type.GET_POST_BY_ID_REQUESTED, fetchPostById);
   yield takeEvery(type.CREATE_POST_REQUESTED, createPost);
   yield takeEvery(type.UPDATE_POST_REQUESTED, updatePost);
   yield takeEvery(type.DELETE_POST_REQUESTED, deletePost);
}

export default userSaga;