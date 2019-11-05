import update from '../../../../helpers/update';
import BanTableService from './BanTableService';


export const BAN_POST_STARTED = "BAN_POST_STARTED";
export const BAN_POST_SUCCESS = "BAN_POST_SUCCESS";
export const BAN_POST_FAILED = "BAN_POST_FAILED";


const initialState = {
    list: {
        data: [],
        loading: false,
        success: false,
        failed: false,
    },   
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
        dispatch(getListActions.started());
        BanTableService.unbanUser(model)//треба вернути назад список юзеров
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
            type: BAN_POST_STARTED
        }
    },  
    success: (data) => {
        console.log("+++++++++++Data", data);
        return {
            type: BAN_POST_SUCCESS,
            payload: data
        }
    },  
    failed: (response) => {
        console.log("failed: (response)", response);
        return {           
            type: BAN_POST_FAILED,
            //errors: response.data
        }
    }
  }

export const banTableReducer = (state = initialState, action) => { 
  let newState = state;

  switch (action.type) {

      case BAN_POST_STARTED: {
          newState = update.set(state, 'list.loading', true);
          newState = update.set(newState, 'list.success', false);
          newState = update.set(newState, 'list.failed', false);
          break;
      }
      case BAN_POST_SUCCESS: {
          newState = update.set(state, 'list.loading', false);
          newState = update.set(newState, 'list.failed', false);
          newState = update.set(newState, 'list.success', true);
          newState = update.set(newState, 'list.data', action.payload.bans);
          console.log("BAN_POST_SUCCESS)", action.payload);

          break;
      }
      case BAN_POST_FAILED: {
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







