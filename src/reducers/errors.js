import * as actionTypes from '../constants/actionTypes';

const initialState = [];

export default function (state = initialState, action) {
  let newErrors
  switch (action.type) {
    case actionTypes.ERROR_OCCURRED:
      newErrors = {"message": action.message };
      return [ ...state, newErrors]
    case actionTypes.API_TOKEN_EXPIRED:
      newErrors = {"message": "El token ha expirado! Vuelva a logarse en su cuenta de Spotify." }
      return [ ...state, newErrors];
    case actionTypes.CLOSE_ERROR_MODAL:
      return []
    default:
      return state;
  }
}
