import update from '../../../helpers/update';
import UserProfileService from './UserProfileService';


export const USER_PROFILE_STARTED = "USER_PROFILE_STARTED";
export const USER_PROFILE_SUCCESS = "USER_PROFILE_SUCCESS";
export const USER_PROFILE_FAILED = "USER_PROFILE_FAILED";

export const EDIT_USER_PROFILE_STARTED = "EDIT_USER_PROFILE_STARTED";
export const EDIT_USER_PROFILE_SUCCESS = "EDIT_USER_PROFILE_SUCCESS";
export const EDIT_USER_PROFILE_FAILED = "EDIT_USER_PROFILE_FAILED";


export const EDIT_USER_PHOTO_SUCCESS = "EDIT_USER_PHOTO_SUCCESS";


const initialState = {
    list: {
        data: [],
        loading: false,
        success: false,
        failed: false,
    },
    editProfile: {
        loading: false,
        failed: false,
        success: false
      }
}

export const setUserData = (mod) => {
    return (dispatch) => {
        dispatch(editUserActions.started());
        UserProfileService.setProfile(mod)
            .then((response) => {
               console.log("+++++++++++Response", response);
               dispatch(editUserActions.success());
               fetchData(dispatch);
            }, err => { throw err; })
            .catch(err => {
               dispatch(editUserActions.failed(err.response));
            });
    }
}

export const editPhoto = (image) => {
    console.log("11111111111111111111+++++++++++Response");
    return (dispatch) => {
        UserProfileService.editImage(image)
            .then((response) => {
               console.log("+++++++++++Response", response);
               dispatch(editUserActions.changephoto(response.data));
            })          
    }
}

const fetchData = (dispatch) => {
        dispatch(getUserActions.started());
        UserProfileService.getProfile()
            .then(response => {
                console.log("+++++++++++Response", response);
                dispatch(getUserActions.success(response.data));
            })
            .catch(err => {
                dispatch(getUserActions.failed(err.response));
            });
}

export const getUserData = () => {
    return dispatch => {
        console.log("+++++++++++Response");
        fetchData(dispatch);
    };
};

export const getUserActions = {
    started: () => {
        return {
            type: USER_PROFILE_STARTED
        }
    },
    success: (data) => {
        console.log("+++++++++++Data", data);
        return {
            type: USER_PROFILE_SUCCESS,
            payload: data
        }
    },
    failed: (response) => {
        console.log("failed: (response)", response);
        return {
            type: USER_PROFILE_FAILED,
            //errors: response.data
        }
    }   
}

export const userProfileReducer = (state = initialState, action) => {
    let newState = state;

    switch (action.type) {

        case EDIT_USER_PHOTO_SUCCESS: {
            newState = update.set(state, 'list.loading', true);
            newState = update.set(newState, 'list.success', false);
            newState = update.set(newState, 'list.failed', false);
            newState = { ...state ,
            list: {
                data:{
                    avatar:action.data
                }
            }}
            break;
        }

        case USER_PROFILE_STARTED: {
            newState = update.set(state, 'list.loading', true);
            newState = update.set(newState, 'list.success', false);
            newState = update.set(newState, 'list.failed', false);
            break;
        }
        case USER_PROFILE_SUCCESS: {
            newState = update.set(state, 'list.loading', false);
            newState = update.set(newState, 'list.failed', false);
            newState = update.set(newState, 'list.success', true);
            newState = update.set(newState, 'list.data', action.payload);

            break;
        }
        case USER_PROFILE_FAILED: {
            newState = update.set(state, 'list.loading', false);
            newState = update.set(newState, 'list.success', false);
            newState = update.set(newState, 'list.failed', true);
            break;
        }
        case EDIT_USER_PROFILE_STARTED: {
            newState = update.set(state, "editProfile.loading", true);
            newState = update.set(newState, "editProfile.failed", false);
            newState = update.set(newState, "editProfile.success", false);
      
            break;
          }
          case EDIT_USER_PROFILE_SUCCESS: {
            newState = update.set(state, "editProfile.loading", false);
            newState = update.set(newState, "editProfile.failed", false);
            newState = update.set(newState, "editProfile.success", true);
      
            break;
          }
          case EDIT_USER_PROFILE_FAILED: {
            newState = update.set(state, "editProfile.loading", false);
            newState = update.set(newState, "editProfile.failed", true);
            newState = update.set(newState, "editProfile.success", false);
      
            break;
          }
        default: {
            return newState;
        }
    }
    return newState;
}

export const editUserActions = {
    started: () => {
      return {
        type: EDIT_USER_PROFILE_STARTED
      };
    },
    success: response => {
      return {
        type: EDIT_USER_PROFILE_SUCCESS,
        payload: response.data
      };
    },
  
    failed: response => {
      return {
        type: EDIT_USER_PROFILE_FAILED,
      };
    },
    changephoto: (response) => {
        console.log("+++++++++++changephoto++++++++++", response);
        return {
            type: EDIT_USER_PHOTO_SUCCESS,
            data: response.data
        }
    }
  };







