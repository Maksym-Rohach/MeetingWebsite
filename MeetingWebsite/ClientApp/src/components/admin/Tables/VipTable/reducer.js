import update from '../../../../helpers/update';
import VipTableService from './VipTableService';


export const VIPS_POST_STARTED = "VIPS_POST_STARTED";
export const VIPS_POST_SUCCESS = "VIPS_POST_SUCCESS";
export const VIPS_POST_FAILED = "VIPS_POST_FAILED";


const initialState = {
    list: {
        data: [],
        totalCount:0,
        loading: false,
        success: false,
        failed: false,
    },   
}

export const getVipsData = (model) => {
    return (dispatch) => {
        dispatch(getListActions.started());
        VipTableService.vipTable(model)                 
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
            type: VIPS_POST_STARTED
        }
    },  
    success: (data) => {
        console.log("+++++++++++Data", data);
        return {
            type: VIPS_POST_SUCCESS,
            payload: data
        }
    },  
    failed: (response) => {
        console.log("failed: (response)", response);
        return {           
            type: VIPS_POST_FAILED,
            //errors: response.data
        }
    }
  }

export const vipTableReducer = (state = initialState, action) => { 
  let newState = state;

  switch (action.type) {

      case VIPS_POST_STARTED: {
          newState = update.set(state, 'list.loading', true);
          newState = update.set(newState, 'list.success', false);
          newState = update.set(newState, 'list.failed', false);
          break;
      }
      case VIPS_POST_SUCCESS: {
          newState = update.set(state, 'list.loading', false);
          newState = update.set(newState, 'list.failed', false);
          newState = update.set(newState, 'list.success', true);
          newState = update.set(newState, 'list.data', action.payload.vips);
          newState = update.set(newState, 'list.totalCount', action.payload.totalCount);
          console.log("VIPS_POST_SUCCESS)", action.payload);

          break;
      }
      case VIPS_POST_FAILED: {
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







