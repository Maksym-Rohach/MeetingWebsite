import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { routerReducer, routerMiddleware } from 'react-router-redux';

import { loginReducer} from "../components/pages/login/reducer";
import { refreshReducer } from '../components/refreshToken/reducer';
import refreshTokenMiddleware from './middleware/refreshTokenMiddleware';
import { userTableReducer} from "../components/admin/Tables/UserTable/reducer";
import { banTableReducer} from "../components/admin/Tables/BanTable/reducer";
import { registrySheduleReducer} from "../components/admin/Schedule/RegistryShedule/reducer";
import { boysReducer} from "../components/boys/reducer";

export default function configureStore (history, initialState) {
    const reducers = {
      login: loginReducer,
      refreshToken: refreshReducer,
      userTable: userTableReducer,
      banTable: banTableReducer,
      registryShedule: registrySheduleReducer,
      boys: boysReducer
    };

    const middleware = [
      thunk,
      routerMiddleware(history)
    ];

    const enhancers = [];
    const isDevelopment = process.env.NODE_ENV === 'development';
    if (isDevelopment && typeof window !== 'undefined' && window.devToolsExtension) {
      enhancers.push(window.devToolsExtension());
    }

    const rootReducer = combineReducers({
      ...reducers,
      routing: routerReducer
    });

    return createStore(
      rootReducer,
      initialState,
      compose(applyMiddleware(...middleware), ...enhancers)
    );
  }
