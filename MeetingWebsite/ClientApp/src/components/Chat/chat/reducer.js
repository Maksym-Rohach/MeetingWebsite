import update from '../../../helpers/update';
import GetMessageService from './GetMessagesService';


export const GETMESSAGES_POST_STARTED = "GETMESSAGES_POST_STARTED";
export const GETMESSAGES_POST_SUCCESS = "GETMESSAGES_POST_SUCCESS";
export const GETMESSAGES_POST_FAILED = "GETMESSAGES_POST_FAILED";


const initialState = {
    list: {
        data: [],
        loading: false,
        success: false,
        failed: false,
    },
}
export const getMessages = (model) => {
    return (dispatch) => {
        dispatch(getListActions.started());
        GetMessageService.getMessages(model)
            .then((response) => {
                console.log("getMessages response:  ", response);
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
            type: GETMESSAGES_POST_STARTED
        }
    },  
    success: (data) => {
        console.log("+++++++++++Data", data);
        return {
            type: GETMESSAGES_POST_SUCCESS,
            payload: data
        }
    },  
    failed: (response) => {
        console.log("failed: (response)", response);
        return {           
            type: GETMESSAGES_POST_FAILED,
            //errors: response.data
        }
    }
  }

export const getMessagesReducer = (state = initialState, action) => { 
  let newState = state;

  switch (action.type) {

      case GETMESSAGES_POST_STARTED: {
          newState = update.set(state, 'list.loading', true);
          newState = update.set(newState, 'list.success', false);
          newState = update.set(newState, 'list.failed', false);
          break;
      }
      case GETMESSAGES_POST_SUCCESS: {
          newState = update.set(state, 'list.loading', false);
          newState = update.set(newState, 'list.failed', false);
          newState = update.set(newState, 'list.success', true);
          newState = update.set(newState, 'list.data', action.payload);
          console.log("GETMESSAGES_POST_SUCCESS)", action.payload);

          break;
      }
      case GETMESSAGES_POST_FAILED: {
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







