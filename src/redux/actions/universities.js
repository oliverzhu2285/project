import * as type from '../types';

export function getUniversities(country) {
  return { 
    type: type.GET_UNIVERSITIES_REQUESTED,
    payload: { country:country }
  }
}

export function getCountries() {
  return { 
    type: type.GET_CONTRIES_REQUESTED
  }
}