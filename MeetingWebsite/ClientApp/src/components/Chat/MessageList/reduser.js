import update from '../../../../src/helpers/update';
import MessageListService from './MessageListService';


export const MESSAGELOAD_POST_STARTED = "MESSAGELOAD_POST_STARTED";
export const MESSAGELOAD_POST_SUCCESS = "MESSAGELOAD_POST_SUCCESS";
export const MESSAGELOAD_POST_FAILED = "MESSAGELOAD_POST_FAILED";


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
        MessageListService.getMessages(model)
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
            type: MESSAGELOAD_POST_STARTED
        }
    },  
    success: (data) => {
        console.log("+++++++++++Data", data);
        return {
            type: MESSAGELOAD_POST_SUCCESS,
            payload: data
        }
    },  
    failed: (response) => {
        console.log("failed: (response)", response);
        return {           
            type: MESSAGELOAD_POST_FAILED,
            //errors: response.data
        }
    }
  }

export const MessageListReducer = (state = initialState, action) => { 
  let newState = state;

  switch (action.type) {

      case MESSAGELOAD_POST_STARTED: {
          newState = update.set(state, 'list.loading', true);
          newState = update.set(newState, 'list.success', false);
          newState = update.set(newState, 'list.failed', false);
          break;
      }
      case MESSAGELOAD_POST_SUCCESS: {
          newState = update.set(state, 'list.loading', false);
          newState = update.set(newState, 'list.failed', false);
          newState = update.set(newState, 'list.success', true);
          newState = update.set(newState, 'list.data', action.payload);
          console.log("MESSAGELOAD_POST_SUCCESS)", action.payload);

          break;
      }
      case MESSAGELOAD_POST_FAILED: {
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







