import * as type from '../types';

const initialState = {
  countries: [],
  loading: false
}

export default function countries(state = initialState, action) {
  switch (action.type) {
    case type.GET_CONTRIES_REQUESTED:
      return {
        ...state,
        countries: [],
        loading: true,
      }
    case type.CONTRIES_SUCCESS:
      return {
        ...state,
        loading: false,
        countries: action.countries,
      }
    case type.CONTRIES_FAILED:
      return {
        ...state,
        loading: false,
        error: action.message,
      }
    default:
      return state
  }
}