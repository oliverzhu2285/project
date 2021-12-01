import * as type from '../types';

const initialState = {
  place: null,
  loading: false
}

export default function postalcode(state = initialState, action) {
  switch (action.type) {
    case type.GET_PLACE_REQUESTED:
      return {
        ...state,
        place: null,
        loading: true,
      }
    case type.PLACE_SUCCESS:
      return {
        ...state,
        loading: false,
        place: action.place,
      }
    case type.PLACE_FAILED:
      return {
        ...state,
        loading: false,
        error: action.message,
      }
    default:
      return state
  }
}