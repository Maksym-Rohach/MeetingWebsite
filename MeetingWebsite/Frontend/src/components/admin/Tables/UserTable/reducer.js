import update from '../../../helpers/update';
import AdminTableService from './AdminTableService';
import isEmpty from 'lodash/isEmpty';
import redirectStatusCode from '../../../services/redirectStatusCode';
import history from '../../../utils/history';

export const MAPING_POST_STARTED = "login/LOGIN_POST_STARTED";
export const MAPING_POST_SUCCESS = "login/LOGIN_POST_SUCCESS";
export const MAPING_POST_FAILED = "login/LOGIN_POST_FAILED";


const initialState = {
    post: {
        loading: false,
        success: false,
        failed: false,
        errors: {}
    },
    user: {
      id: '',
      nickname: '',
      registredate:'',
      city: '',
      status:''
    }
}

export const usertableReducer = (state = initialState, action) => {
  let newState = state;

  switch (action.type) {

      case MAPING_POST_STARTED: {
          newState = update.set(state, 'post.loading', true);
          newState = update.set(newState, 'post.success', false);
          newState = update.set(newState, 'post.errors', {});
          newState = update.set(newState, 'post.failed', false);
          break;
      }
      case MAPING_POST_SUCCESS: {
          newState = update.set(state, 'post.loading', false);
          newState = update.set(newState, 'post.failed', false);
          newState = update.set(newState, 'post.errors', {});
          newState = update.set(newState, 'post.success', true);
          break;
      }
      case MAPING_POST_FAILED: {
          newState = update.set(state, 'post.loading', false);
          newState = update.set(newState, 'post.success', false);
          newState = update.set(newState, 'post.errors', action.errors);
          newState = update.set(newState, 'post.failed', true);
          break;
      }
      default: {
          return newState;
      }
  }
  return newState;
}

export const mapingtable = (model) => {
  return (dispatch) => {
      dispatch(loginActions.started());
      AdminTableService.usertable(model)
          .then((response) => {
              dispatch(loginActions.success());
              loginByJWT(response.data, dispatch);
              console.log("----PushUrl----", pushUrl);
              history.push(pushUrl);
          }, err=> { throw err; })
          .catch(err=> {
            dispatch(loginActions.failed(err.response));
            redirectStatusCode(err.response.status);
          });
  }
}


export const loginActions = {
  started: () => {
      return {
          type: MAPING_POST_STARTED
      }
  },

  success: () => {
      return {
          type: MAPING_POST_SUCCESS
      }
  },

  failed: (response) => {
      return {
          type: MAPING_POST_FAILED,
          errors: response.data
      }
  }
}


