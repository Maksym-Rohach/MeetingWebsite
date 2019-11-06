import update from '../../../helpers/update';
import HomeService from './HomeService';

export const HOME_STARTED = "HOME_STARTED";
export const HOME_SUCCESS = "HOME_SUCCESS";
export const HOME_FAILED = "HOME_FAILED";

const initialState = {
    post: {
        data: [],
        loading: false,
        success: false,
        failed: false,
    },  
}


export const getUserData = () => {
    return (dispatch) => {
        dispatch(getListActions.started());
            HomeService.home()
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
            type: HOME_STARTED
        }
    },  
    success: (data) => {
        console.log("+++++++++++Data", data);
        return {
            type: HOME_SUCCESS,
            payload: data, 
        }
    },  
    failed: (response) => {
        console.log("failed: (response)", response);
        return {           
            type: HOME_FAILED,
            //errors: response.data
        }
    }
  }


  export const homeReducer = (state = initialState, action) => {
    let newState = state;
    
  switch (action.type) {

    case HOME_STARTED: {
        newState = update.set(state, 'post.loading', true);
        newState = update.set(newState, 'post.success', false);
        newState = update.set(newState, 'post.failed', false);
        break;
    }   
    case HOME_SUCCESS: {
        newState = update.set(state, 'post.loading', false);
        newState = update.set(newState, 'post.failed', false);
        newState = update.set(newState, 'post.success', true);
        newState = update.set(newState, 'post.data', action.payload);
        break;
    }
    case HOME_FAILED: {
        newState = update.set(state, 'post.loading', false);
        newState = update.set(newState, 'post.success', false);
        newState = update.set(newState, 'post.failed', true);
        break;
    }
    default: {
        return newState;
    }
}
return newState;
}