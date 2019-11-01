import update from '../../../../src/helpers/update';
import sendService from './SendService';


export const SEND_POST_STARTED = "SEND_POST_STARTED";
export const SEND_POST_SUCCESS = "SEND_POST_SUCCESS";
export const SEND_POST_FAILED = "SEND_POST_FAILED";


const initialState = {
    list: {
        data: [],
        loading: false,
        success: false,
        failed: false,
    },   
}

export const sendMessages = (model) => {
    return (dispatch) => {
        dispatch(getListActions.started());
        sendService.sendMessages(model)
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
            type: SEND_POST_STARTED
        }
    },  
    success: (data) => {
        console.log("+++++++++++Data", data);
        return {
            type: SEND_POST_SUCCESS,
            payload: data
        }
    },  
    failed: (response) => {
        console.log("failed: (response)", response);
        return {           
            type: SEND_POST_FAILED,
            //errors: response.data
        }
    }
  }

export const SendMessageReducer = (state = initialState, action) => { 
  let newState = state;

  switch (action.type) {

      case SEND_POST_STARTED: {
          newState = update.set(state, 'list.loading', true);
          newState = update.set(newState, 'list.success', false);
          newState = update.set(newState, 'list.failed', false);
          break;
      }
      case SEND_POST_SUCCESS: {
          newState = update.set(state, 'list.loading', false);
          newState = update.set(newState, 'list.failed', false);
          newState = update.set(newState, 'list.success', true);
          newState = update.set(newState, 'list.data', action.payload);
          console.log("SEND_POST_SUCCESS)", action.payload);

          break;
      }
      case SEND_POST_FAILED: {
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







