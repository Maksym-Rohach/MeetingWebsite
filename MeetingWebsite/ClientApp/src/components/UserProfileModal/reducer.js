import update from '../../helpers/update';
import UserProfileModalService from './UserProfileModalService';


export const GET_INFO_STARTED = "GET_INFO_STARTED";
export const GET_INFO_SUCCESS = "GET_INFO_SUCCESS";
export const GET_INFO_FAILED = "GET_INFO_FAILED";



const initialState = {
    list: {
        nickname:'',
        gender:'',
        birthday:'',
        avatar:'',
        zodiac:'',
        city:'',
        status:'',
        loading: false,
        success: false,
        failed: false,
    } 
}

export const getUserModalData = (model) => {
    return (dispatch) => {
        dispatch(getListActions.started());
        UserProfileModalService.getUserInfo(model)
            .then((response) => {
                console.log("+++++++++++Response", response);
                dispatch(getListActions.success(response.data));               
            }, err=> { throw err; })
            .catch(err=> {
              dispatch(getListActions.failed(err.response));
            });
    }
}

export const sayHelloToUser = (model) => {
    return (dispatch) => {
        UserProfileModalService.sayHello(model)
    }
}

export const getListActions = {
    started: () => {
        return {
            type: GET_INFO_STARTED
        }
    },  
    success: (data) => {
        console.log("+++++++++++Data", data);
        return {
            type:  GET_INFO_SUCCESS,
            payload: data
        }
    },  
    failed: (response) => {
        console.log("failed: (response)", response);
        return {           
            type:  GET_INFO_FAILED,
            //errors: response.data
        }
    }
  }

export const userModalReducer = (state = initialState, action) => { 
  let newState = state;

  switch (action.type) {

      case  GET_INFO_STARTED: {
          newState = update.set(state, 'list.loading', true);
          newState = update.set(newState, 'list.success', false);
          newState = update.set(newState, 'list.failed', false);
          break;
      }
      case  GET_INFO_SUCCESS: {
          newState = update.set(state, 'list.loading', false);
          newState = update.set(newState, 'list.failed', false);
          newState = update.set(newState, 'list.success', true);
          newState = update.set(newState, 'list.nickname', action.payload.nickName);
          newState = update.set(newState, 'list.gender', action.payload.gender);
          newState = update.set(newState, 'list.birthday', action.payload.birthday);
          newState = update.set(newState, 'list.avatar', action.payload.avatar);
          newState = update.set(newState, 'list.zodiac', action.payload.zodiac);
          newState = update.set(newState, 'list.city', action.payload.city);
          newState = update.set(newState, 'list.status', action.payload.status);
          console.log(" GET_INFO_SUCCESS)", action.payload);
          break; 
      }
      case GET_INFO_FAILED: {
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







