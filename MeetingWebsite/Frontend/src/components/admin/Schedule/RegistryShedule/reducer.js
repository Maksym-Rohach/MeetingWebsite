import update from '../../../../helpers/update';
import RegistrySheduleService from './RegistrySheduleService';


export const REGISTER_SHEDULE_STARTED = "REGISTER_SHEDULE_STARTED";
export const REGISTER_SHEDULE_SUCCESS = "REGISTER_SHEDULE_SUCCESS";
export const REGISTER_SHEDULE_FAILED = "REGISTER_SHEDULE_FAILED";


const initialState = {
    list: {
        data: [],
        loading: false,
        success: false,
        failed: false,
    },   
}

export const getRegistryData = (model) => {
    console.log("+++++++++++Response");
    return (dispatch) => {
        dispatch(getListActions.started());
            RegistrySheduleService.registryShedule(model)
            .then((response) => {
                console.log("+++++++++++Response", response);
                dispatch(getListActions.success(response.data));               
            }, err=> { throw err; })
            .catch(err=> {
                console.log("+++++++++++catch");
              dispatch(getListActions.failed(err.response));
            });
    }
}

export const getListActions = {
    started: () => {
        return {
            type: REGISTER_SHEDULE_STARTED
        }
    },  
    success: (data) => {
        console.log("+++++++++++Data", data);
        return {
            type: REGISTER_SHEDULE_SUCCESS,
            payload: data
        }
    },  
    failed: (response) => {
        console.log("failed: (response)", response);
        return {           
            type: REGISTER_SHEDULE_FAILED,
            //errors: response.data
        }
    }
  }

export const registrySheduleReducer = (state = initialState, action) => { 
  let newState = state;

  switch (action.type) {

      case REGISTER_SHEDULE_STARTED: {
          newState = update.set(state, 'list.loading', true);
          newState = update.set(newState, 'list.success', false);
          newState = update.set(newState, 'list.failed', false);
          break;
      }
      case REGISTER_SHEDULE_SUCCESS: {
          newState = update.set(state, 'list.loading', false);
          newState = update.set(newState, 'list.failed', false);
          newState = update.set(newState, 'list.success', true);
          newState = update.set(newState, 'list.data', action.payload);
          console.log("REGISTER_SHEDULE_SUCCESS)", action.payload);

          break;
      }
      case REGISTER_SHEDULE_FAILED: {
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







