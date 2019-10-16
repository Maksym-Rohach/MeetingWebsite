import RefreshService from './RefreshService'
import {loginByJWT, logout} from '../pages/login/reducer';

export const REFRESH_STARTED = "REFRESH_STARTED";
export const REFRESH_SUCCESS = "REFRESH_SUCCESS";
export const REFRESH_FAILED = "REFRESH_FAILED";

const initialState = {
  success: false,
  failed: false,
  loading: false
}

export const refreshToken = (dispatch) => {
  dispatch(refresh.started())
  return RefreshService.RefreshToken()
      .then((response) => {
          dispatch(refresh.success());
          loginByJWT(response.data, dispatch);
          return Promise.resolve(response);
      })
      .catch((err) => {
          dispatch(refresh.failed());
          logout(dispatch);
          return Promise.reject(err);
      })
}

export const refreshReducer = (state = initialState, action) => {
  let newState = state;
  switch(action.type){
      case 'REFRESH_STARTED': {
          newState = {...initialState, loading: true };
          break;
      }
      case 'REFRESH_SUCCESS': {
          newState = {...state, success: true, loading: false };
          break;
      }
      case 'REFRESH_FAILED': {
          newState = {...state, failed: true, loading: false };
          break;
      }
      default: {
          return newState
      }
  };
  return newState;
}

export const refresh = {
  started: () => {
      return {
          type: REFRESH_STARTED
      }
  },

  success: () => {
      return {
          type: REFRESH_SUCCESS
      }
  },

  failed: (response) => {
      return {
          type: REFRESH_FAILED,
          // errors: response.data
      }
  }
}
