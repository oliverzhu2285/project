import * as type from '../types';

const initialState = {
  posts: [],
  post: null,
  update: false,
  loading: false
}

export default function posts(state = initialState, action) {
  switch (action.type) {
    case type.GET_POSTS_REQUESTED:
      return {
        ...state,
        posts: [],
        loading: true,
        update: false,
      }
    case type.GET_POST_BY_ID_REQUESTED:
      return {
        ...state,
        post: null,
        loading: true,
        update: false,
      }
    case type.POSTS_SUCCESS:
      return {
        ...state,
        loading: false,
        update: action.update,
        posts: action.posts?action.posts:[],
        post: action.post?action.post:null
      }
    case type.POSTS_FAILED:
      return {
        ...state,
        update: false,
        loading: false,
        error: action.message,
      }
    default:
      return state
  }
}