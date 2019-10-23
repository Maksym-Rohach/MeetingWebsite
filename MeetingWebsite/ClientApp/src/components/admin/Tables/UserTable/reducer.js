import update from '../../../../helpers/update';
import UserTableService from './UserTableService';


export const MAPING_POST_STARTED = "MAPING_POST_STARTED";
export const MAPING_POST_SUCCESS = "MAPING_POST_SUCCESS";
export const MAPING_POST_FAILED = "MAPING_POST_FAILED";


const initialState = {
    list: {
        data: [],
        loading: false,
        success: false,
        failed: false,
    },   
}

export const getUsersData = (model) => {
    return (dispatch) => {
        dispatch(getListActions.started());
            UserTableService.userTable(model)
            .then((response) => {
                console.log("+++++++++++Response", response);
                dispatch(getListActions.success(response.data));               
            }, err=> { throw err; })
            .catch(err=> {
              dispatch(getListActions.failed(err.response));
            });
    }
}

export const BanUser = (model) => {
    return (dispatch) => {
        dispatch(getListActions.started());
            UserTableService.banUser(model);//теба вернути назад список юзеров
            // .then((response) => {
            //     console.log("+++++++++++Response", response);
            //     dispatch(getListActions.success(response.data));               
            // }, err=> { throw err; })
            // .catch(err=> {
            //   dispatch(getListActions.failed(err.response));
            //});
    }
}

export const getListActions = {
    started: () => {
        return {
            type: MAPING_POST_STARTED
        }
    },  
    success: (data) => {
        console.log("+++++++++++Data", data);
        return {
            type: MAPING_POST_SUCCESS,
            payload: data
        }
    },  
    failed: (response) => {
        console.log("failed: (response)", response);
        return {           
            type: MAPING_POST_FAILED,
            //errors: response.data
        }
    }
  }

export const userTableReducer = (state = initialState, action) => { 
  let newState = state;

  switch (action.type) {

      case MAPING_POST_STARTED: {
          newState = update.set(state, 'list.loading', true);
          newState = update.set(newState, 'list.success', false);
          newState = update.set(newState, 'list.failed', false);
          break;
      }
      case MAPING_POST_SUCCESS: {
          newState = update.set(state, 'list.loading', false);
          newState = update.set(newState, 'list.failed', false);
          newState = update.set(newState, 'list.success', true);
          newState = update.set(newState, 'list.data', action.payload.users);
          console.log("MAPING_POST_SUCCESS)", action.payload);
          break;
      }
      case MAPING_POST_FAILED: {
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







