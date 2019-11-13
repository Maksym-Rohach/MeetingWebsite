import update from '../../helpers/update'
import ChatsService from './ChatsService';


export const GETCHATS_POST_STARTED = "GETCHATS_POST_STARTED";
export const GETCHATS_POST_SUCCESS = "GETCHATS_POST_SUCCESS";
export const GETCHATS_POST_FAILED = "GETCHATS_POST_FAILED";

export const INFORMBACK_POST_STARTED = "INFORMBACK_POST_STARTED";
export const INFORMBACK_POST_SUCCESS = "INFORMBACK_POST_SUCCESS";
export const INFORMBACK_POST_FAILED = "INFORMBACK_POST_FAILED";

export const SENDMESSAGE_POST_STARTED = "SENDMESSAGE_POST_STARTED";
export const SENDMESSAGE_POST_SUCCESS = "SENDMESSAGE_POST_SUCCESS";
export const SENDMESSAGE_POST_FAILED = "SENDMESSAGE_POST_FAILED";
const initialState = {
    list: {
        data:{},
        loading: false,
        success: false,
        failed: false,
    },
    isSuccess:{
        data:{},
        loading: false,
        success: false,
        failed: false,
    },
    isSendSuccess:{
        data:{},
        loading: false,
        success: false,
        failed: false,
    }
}
export const getChats = (model) => {
    return (dispatch) => {
        dispatch(getListActions.started());
        ChatsService.getChats(model)
            .then((response) => {
                console.log("GETCHATS response:  ", response);
                dispatch(getListActions.success(response.data));               
            }, err=> { throw err; })
            .catch(err=> {
              dispatch(getListActions.failed(err.response));
            });
    }
}
export const informBack = (model) => {
    return (dispatch) => {
        ChatsService.informBack(model)
            .then((response) => {
                console.log("GETCHATS response:  ", response);            
            }, err=> { throw err; })
            .catch(err=> {
            });
    }
}
export const sendMessage = (model) => {
    return (dispatch) => {
        ChatsService.sendMessage(model)
            .then((response) => {
                console.log("GETCHATS response:  ", response);            
            }, err=> { throw err; })
            .catch(err=> {
            });
    }
}
export const getListActions = {
    started: () => {
        return {
            type: GETCHATS_POST_STARTED
        }
    },  
    success: (data) => {
        console.log("+++++++++++Data", data);
        return {
            type: GETCHATS_POST_SUCCESS,
            payload: data
        }
    },  
    failed: (response) => {
        console.log("failed: (response)", response);
        return {           
            type: GETCHATS_POST_FAILED,
            //errors: response.data
        }
    }
  }

export const getChatsReducer = (state = initialState, action) => { 
  let newState = state;

  switch (action.type) {

      case GETCHATS_POST_STARTED: {
          newState = update.set(state, 'list.loading', true);
          newState = update.set(newState, 'list.success', false);
          newState = update.set(newState, 'list.failed', false);
          break;
      }
      case GETCHATS_POST_SUCCESS: {
          newState = update.set(state, 'list.loading', false);
          newState = update.set(newState, 'list.failed', false);
          newState = update.set(newState, 'list.success', true);
          newState = update.set(newState, 'list.data', action.payload);
          console.log("GETCHATS_POST_SUCCESS)", action.payload);

          break;
      }
      case GETCHATS_POST_FAILED: {
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
export const informBackReducer = (state = initialState, action) => { 
    let newState = state;
  
    switch (action.type) {
  
        case INFORMBACK_POST_STARTED: {
            newState = update.set(state, 'list.loading', true);
            newState = update.set(newState, 'list.success', false);
            newState = update.set(newState, 'list.failed', false);
            break;
        }
        case INFORMBACK_POST_SUCCESS: {
            newState = update.set(state, 'list.loading', false);
            newState = update.set(newState, 'list.failed', false);
            newState = update.set(newState, 'list.success', true);
            newState = update.set(newState, 'list.data', action.payload);
            console.log("INFORMBACK_POST_SUCCESS)", action.payload);
  
            break;
        }
        case INFORMBACK_POST_FAILED: {
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
export const sendMessageReducer = (state = initialState, action) => { 
    let newState = state;
  
    switch (action.type) {
  
        case SENDMESSAGE_POST_STARTED: {
            newState = update.set(state, 'list.loading', true);
            newState = update.set(newState, 'list.success', false);
            newState = update.set(newState, 'list.failed', false);
            break;
        }
        case SENDMESSAGE_POST_SUCCESS: {
            newState = update.set(state, 'list.loading', false);
            newState = update.set(newState, 'list.failed', false);
            newState = update.set(newState, 'list.success', true);
            newState = update.set(newState, 'list.data', action.payload);
            console.log("SENDMESSAGE_POST_SUCCESS)", action.payload);
  
            break;
        }
        case SENDMESSAGE_POST_FAILED: {
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