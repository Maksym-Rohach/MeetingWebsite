import update from '../../../../helpers/update';
import BanTableService from './BanTableService';


export const UNBAN_POST_STARTED = "UNBAN_POST_STARTED";
export const UNBAN_POST_SUCCESS = "UNBAN_POST_SUCCESS";
export const UNBAN_POST_FAILED = "UNBAN_POST_FAILED";

export const GETBAN_TABLE_STARTED = "GETBAN_TABLE_STARTED";
export const GETBAN_TABLE_SUCCESS = "GETBAN_TABLE_SUCCESS";
export const GETBAN_TABLE_FAILED = "GETBAN_TABLE_FAILED";



const initialState = {
    list: {
        data: [],
        totalCount:0,
        loading: false,
        success: false,
        failed: false,
    },
    unban:
    {
        loading: false,
        success: false,
        failed: false,
    }   
}

export const getBansData = (model) => {
    return (dispatch) => {
        console.log("+++++++++++model++++++++++", model);
        dispatch(getListActions.started());
            BanTableService.banTable(model)
            .then((response) => {
                dispatch(getListActions.success(response.data));               
            }, err=> { throw err; })
            .catch(err=> {
              dispatch(getListActions.failed(err.response));
            });
    }
}

export const unBanUser = (model) => {
    return (dispatch) => {
        dispatch(getUnBanActions.started());
        BanTableService.unbanUser(model)
             .then((response) => {
               
             }, err=> { throw err; })
             .catch(err=> {
               dispatch(getUnBanActions.failed(err.response));
             });
    }
}

export const getListActions = {
    started: () => {
        return {
            type: GETBAN_TABLE_STARTED
        }
    },  
    success: (data) => {
        console.log("+++++++++++Data", data);
        return {
            type: GETBAN_TABLE_SUCCESS,
            payload: data
        }
    },  
    failed: (response) => {
        console.log("failed: (response)", response);
        return {           
            type: GETBAN_TABLE_FAILED,
            //errors: response.data
        }
    }
  }

  
export const getUnBanActions = {
    started: () => {
        return {
            type: UNBAN_POST_STARTED
        }
    },  
    success: (data) => {
        console.log("+++++++++++Data", data);
        return {
            type: UNBAN_POST_SUCCESS,
            payload: data
        }
    },  
    failed: (response) => {
        console.log("failed: (response)", response);
        return {           
            type: UNBAN_POST_FAILED,
            //errors: response.data
        }
    }
  }

export const banTableReducer = (state = initialState, action) => { 
  let newState = state;

  switch (action.type) {

      case GETBAN_TABLE_STARTED: {
          newState = update.set(state, 'list.loading', true);
          newState = update.set(newState, 'list.success', false);
          newState = update.set(newState, 'list.failed', false);
          break;
      }
      case GETBAN_TABLE_SUCCESS: {
          newState = update.set(state, 'list.loading', false);
          newState = update.set(newState, 'list.failed', false);
          newState = update.set(newState, 'list.success', true);
          newState = update.set(newState, 'list.data', action.payload.bans);
          newState = update.set(newState, 'list.totalCount', action.payload.totalCount);
          console.log("GETBAN_TABLE_SUCCESS)", action.payload);

          break;
      }
      case GETBAN_TABLE_FAILED: {
          newState = update.set(state, 'list.loading', false);
          newState = update.set(newState, 'list.success', false);
          newState = update.set(newState, 'list.failed', true);
          break;
      }
      case UNBAN_POST_STARTED: {
        newState = update.set(state, 'unban.loading', true);
        newState = update.set(newState, 'unban.success', false);
        newState = update.set(newState, 'unban.failed', false);
        break;
    }
    case UNBAN_POST_SUCCESS: {
        newState = update.set(state, 'unban.loading', false);
        newState = update.set(newState, 'unban.success', true);
        newState = update.set(newState, 'unban.failed', false);
        break;
    }
    case UNBAN_POST_FAILED: {
        newState = update.set(state, 'unban.loading', false);
        newState = update.set(newState, 'unban.success', false);
        newState = update.set(newState, 'unban.failed', true);
        break;
    }
      default: {
          return newState;
      }
  }
  return newState;
}







