import * as type from '../types';

const initialState = {
  universities: [],
  loading: false
}

export default function universities(state = initialState, action) {
  switch (action.type) {
    case type.GET_UNIVERSITIES_REQUESTED:
      return {
        ...state,
        universities: [],
        loading: true,
      }
    case type.UNIVERSITIES_SUCCESS:
      return {
        ...state,
        loading: false,
        universities: action.universities,
      }
    case type.UNIVERSITIES_FAILED:
      return {
        ...state,
        loading: false,
        error: action.message,
      }
    default:
      return state
  }
}