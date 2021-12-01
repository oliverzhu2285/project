import * as type from '../types';

export function getPlace(country, code) {
  return { 
    type: type.GET_PLACE_REQUESTED,
    payload: { code: code, country: country }
  }
}
