import update from '../../../../src/helpers/update';
import chatService from './ChatService';


export const CHAT_POST_STARTED = "CHAT_POST_STARTED";
export const CHAT_POST_SUCCESS = "CHAT_POST_SUCCESS";
export const CHAT_POST_FAILED = "CHAT_POST_FAILED";


const initialState = {
    list: {
        data: [],
        loading: false,
        success: false,
        failed: false,
    },   
}

export const sendMessage = (model) => {
    return (dispatch) => {
        dispatch(getListActions.started());
        chatService.sendMessage(model)
            .then((response) => {
                console.log("sendMessage response:  ", response);
                dispatch(getListActions.success(response.data));               
            }, err=> { throw err; })
            .catch(err=> {
              dispatch(getListActions.failed(err.response));
            });
    }
}
export const getMessages = (model) => {
    return (dispatch) => {
        dispatch(getListActions.started());
        chatService.getMessages(model)
            .then((response) => {
                console.log("getMessages response:  ", response);
                dispatch(getListActions.success(response.data));               
            }, err=> { throw err; })
            .catch(err=> {
              dispatch(getListActions.failed(err.response));
            });
    }
}
export const getChats = (model) => {
    return (dispatch) => {
        dispatch(getListActions.started());
        chatService.getChats(model)
            .then((response) => {
                console.log("getChats response:  ", response);
                dispatch(getListActions.success(response.data));               
            }, err=> { throw err; })
            .catch(err=> {
              dispatch(getListActions.failed(err.response));
            });
    }
}
export const deleteMessage = (model) => {
    return (dispatch) => {
        dispatch(getListActions.started());
        chatService.deleteMessage(model)
            .then((response) => {
                console.log("deleteMessage response:  ", response);
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
            type: CHAT_POST_STARTED
        }
    },  
    success: (data) => {
        console.log("+++++++++++Data", data);
        return {
            type: CHAT_POST_SUCCESS,
            payload: data
        }
    },  
    failed: (response) => {
        console.log("failed: (response)", response);
        return {           
            type: CHAT_POST_FAILED,
            //errors: response.data
        }
    }
  }

export const ChatReducer = (state = initialState, action) => { 
  let newState = state;

  switch (action.type) {

      case CHAT_POST_STARTED: {
          newState = update.set(state, 'list.loading', true);
          newState = update.set(newState, 'list.success', false);
          newState = update.set(newState, 'list.failed', false);
          break;
      }
      case CHAT_POST_SUCCESS: {
          newState = update.set(state, 'list.loading', false);
          newState = update.set(newState, 'list.failed', false);
          newState = update.set(newState, 'list.success', true);
          newState = update.set(newState, 'list.data', action.payload);
          console.log("CHAT_POST_SUCCESS)", action.payload);

          break;
      }
      case CHAT_POST_FAILED: {
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







