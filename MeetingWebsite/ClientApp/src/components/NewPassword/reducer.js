import update from '../../helpers/update';
import ResetPasswordService from './ResetPasswordService';


export const RESETPASS_POST_STARTED = "RESETPASS_POST_STARTED";
export const RESETPASS_POST_SUCCESS = "RESETPASS_POST_SUCCESS";
export const RESETPASS_POST_FAILED = "RESETPASS_POST_FAILED";


const initialState = {
    list: {
        ok: false,
        errors: {},
        loading: false,
        success: false,
        failed: false,
    },   
}

export const getResetData = (model) => {
    return (dispatch) => {
        dispatch(getListActions.started());
        ResetPasswordService.resetPassword(model)
            .then((response) => {
                console.log("+++++++++++Response", response);
                dispatch(getListActions.success(response.data));               
            }, err=> { throw err; })
            .catch(err=> {
              dispatch(getListActions.failed(err.response));
            });
    }
}

export const getListActions = {
    started: () => {
        return {
            type: RESETPASS_POST_STARTED
        }
    },  
    success: (data) => {
        console.log("+++++++++++Data", data);
        return {
            type: RESETPASS_POST_SUCCESS,
            payload: data
        }
    },  
    failed: (response) => {
        console.log("failed: (response)", response);
        return {           
            type: RESETPASS_POST_FAILED,
            errors: response.data
        }
    }
  }

export const resetPasswordReducer = (state = initialState, action) => { 
  let newState = state;

  switch (action.type) {

      case RESETPASS_POST_STARTED: {
          newState = update.set(state, 'list.loading', true);
          newState = update.set(newState, 'list.success', false);
          newState = update.set(newState, 'list.failed', false);
          break;
      }
      case RESETPASS_POST_SUCCESS: {
          newState = update.set(state, 'list.loading', false);
          newState = update.set(newState, 'list.failed', false);
          newState = update.set(newState, 'list.success', true);
          newState = update.set(newState, 'list.ok', action.payload);
          console.log("RESETPASS_POST_SUCCESS)", action.payload);
          break; 
      }
      case RESETPASS_POST_FAILED: {
          newState = update.set(state, 'list.loading', false);
          newState = update.set(newState, 'list.success', false);
          newState = update.set(newState, 'list.errors', action.errors);
          newState = update.set(newState, 'list.failed', true);
          console.log("RESETPASS_POST_FAILED)", action);
          break;
      }
      default: {
          return newState;
      }
  }
  return newState;
}







