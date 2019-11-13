import update from '../../../../helpers/update';
import AdminTableService from './AdminTableService';


export const ADMINS_POST_STARTED = "ADMINS_POST_STARTED";
export const ADMINS_POST_SUCCESS = "ADMINS_POST_SUCCESS";
export const ADMINS_POST_FAILED = "ADMINS_POST_FAILED";


const initialState = {
    list: {
        data: [],
        loading: false,
        success: false,
        failed: false,
    },   
}

export const getAdminsData = (model) => {
    return (dispatch) => {
        dispatch(getListActions.started());
            AdminTableService.adminTable(model)
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
            type: ADMINS_POST_STARTED
        }
    },  
    success: (data) => {
        console.log("+++++++++++Data", data);
        return {
            type: ADMINS_POST_SUCCESS,
            payload: data
        }
    },  
    failed: (response) => {
        console.log("failed: (response)", response);
        return {           
            type: ADMINS_POST_FAILED,
            //errors: response.data
        }
    }
  }

export const adminTableReducer = (state = initialState, action) => { 
  let newState = state;

  switch (action.type) {

      case ADMINS_POST_STARTED: {
          newState = update.set(state, 'list.loading', true);
          newState = update.set(newState, 'list.success', false);
          newState = update.set(newState, 'list.failed', false);
          break;
      }
      case ADMINS_POST_SUCCESS: {
          newState = update.set(state, 'list.loading', false);
          newState = update.set(newState, 'list.failed', false);
          newState = update.set(newState, 'list.success', true);
          newState = update.set(newState, 'list.data', action.payload);
          console.log("ADMINS_POST_SUCCESS)", action.payload);

          break;
      }
      case ADMINS_POST_FAILED: {
          newState = update.set(state, 'list.loading', false);
          newState = update.set(newState, 'list.success', false);
          newState = update.set(newState, 'list.failed', true);
          break;
      }
      default: {
          return newState;
      }
  }
  return newState;
}







