import update from '../../../helpers/update';
import Forgot_Password_Service from './Forgot_Password_Service';
import isEmpty from 'lodash/isEmpty';
import setAuthorizationToken from '../../../utils/setAuthorizationToken';
import jwt from 'jsonwebtoken';
import redirectStatusCode from '../../../services/redirectStatusCode';
import history from '../../../utils/history';

export const FORGOT_PASSWORD_STARTED = "FORGOT_PASSWORD_STARTED";
export const FORGOT_PASSWORD_SUCCESS = "FORGOT_PASSWORD_SUCCESS";
export const FORGOT_PASSWORD_FAILED  = "FORGOT_PASSWORD_FAILED";
// export const Forgot_Password_SET_CURRENT_USER = "Forgot_Password_SET_CURRENT_USER";

 
const initialState = {
    post: {
        loading: false,
        success: false,
        failed: false,
        errors: {}
    },
    isAuthenticated: false,
    user: {
      id: '',
      name: '',
      image:'',
      roles: []
    }
}

export const forgot_passwordReducer = (state = initialState, action) => {
  let newState = state;

  switch (action.type) {

      case FORGOT_PASSWORD_STARTED: {
          newState = update.set(state, 'post.loading', true);
          newState = update.set(newState, 'post.success', false);
          newState = update.set(newState, 'post.errors', {});
          newState = update.set(newState, 'post.failed', false);
          break;
      }
      // case Forgot_Password_SET_CURRENT_USER: {
      //     return {
      //         ...state,
      //         isAuthenticated: !isEmpty(action.user),
      //         user: action.user
      //     };
      // }
      case FORGOT_PASSWORD_SUCCESS: {
          newState = update.set(state, 'post.loading', false);
          newState = update.set(newState, 'post.failed', false);
          newState = update.set(newState, 'post.errors', {});
          newState = update.set(newState, 'post.success', true);
          break;
      }
      case FORGOT_PASSWORD_FAILED: {
          newState = update.set(state, 'post.loading', false);
          newState = update.set(newState, 'post.success', false);
          newState = update.set(newState, 'post.errors', action);
          newState = update.set(newState, 'post.failed', true);
          break;
      }
      default: {
          return newState;
      }
  }

  return newState;
}

export const forgot_password = (model) => {
  return (dispatch) => {
      dispatch(forgot_passwordActions.started());
      Forgot_Password_Service.forgot_password(model)
          .then((response) => {
              dispatch(forgot_passwordActions.success());
              //loginByJWT(response.data, dispatch);
              // const pushUrl = getUrlToRedirect();
              // console.log("----PushUrl----", pushUrl);
              // history.push(pushUrl);

          }, err=> { throw err; })
          .catch(err=> {
            dispatch(forgot_passwordActions.failed(err.response));
            redirectStatusCode(err.response.status);
          });
  }
}

// function getUrlToRedirect () {

//   var user = jwt.decode(localStorage.jwtToken);
//   let roles = user.roles;
//   let path = '';
//   if (Array.isArray(roles)) {
//     for (let i = 0; i < roles.length; i++) {
     
//       if (roles[i] == "User") {      
//         path = "/admin";
//         break;
//       }
//       else if (roles[i] == "Admin") {        
//         path = "/admin";
//         break;
//       }
//     }
//   }
//   else {
//     if (roles == "User") {
//       path = "/admin";
//     }
//     else if (roles == "Admin") {
//       path = "/admin";
//     }
//   }
//   console.log("++++++++++Exit++++++++++", path);
//   return path;
// }


export const forgot_passwordActions = {
  started: () => {
      return {
          type: FORGOT_PASSWORD_STARTED
      }
  },

  success: () => {
      return {
          type: FORGOT_PASSWORD_SUCCESS
      }
  },

  failed: (response) => {
    console.log("Failed",response);
      return {
          type: FORGOT_PASSWORD_FAILED,
          errors: response.data.invalid
      }
  },

  // setCurrentUser: (user) => {
  //   console.log('Forgot_Password_SET_CURRENT_USER: ', user);
  //     return {
  //         type: FORGOT_PASSWORD_CURRENT_USER,
  //         user
  //     }
  // }
}


