import update from '../../../helpers/update';
import UserProfileService from './UserProfileService';


export const USER_PROFILE_STARTED = "USER_PROFILE_STARTED";
export const USER_PROFILE_SUCCESS = "USER_PROFILE_SUCCESS";
export const USER_PROFILE_FAILED = "USER_PROFILE_FAILED";


const initialState = {
    list: {
        data: [],
        loading: false,
        success: false,
        failed: false,
    },
}

export const setUserData = (mod) => {
    return (dispatch) => {
        dispatch(getUserActions.started());
        UserProfileService.setProfile(mod)
            .then((response) => {
                console.log("+++++++++++Response", response);
                dispatch(getUserActions.success(response.data));
            }, err => { throw err; })
            .catch(err => {
                dispatch(getUserActions.failed(err.response));
            });
    }
}

export const getUserData = () => {
    return (dispatch) => {
        dispatch(getUserActions.started());
        UserProfileService.getProfile()
            .then((response) => {
                console.log("+++++++++++Response", response);
                dispatch(getUserActions.success(response.data));
            }, err => { throw err; })
            .catch(err => {
                dispatch(getUserActions.failed(err.response));
            });
    }
}

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
            console.log("USER_PROFILE_SUCCESS)", action.payload);

            break;
        }
        case USER_PROFILE_FAILED: {
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