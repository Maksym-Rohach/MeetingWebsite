import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { loginReducer} from "../components/pages/login/reducer";
import { refreshReducer } from '../components/refreshToken/reducer';
import refreshTokenMiddleware from './middleware/refreshTokenMiddleware';
import { userTableReducer} from "../components/admin/Tables/UserTable/reducer";
import { createBrowserHistory } from 'history';
import { banTableReducer} from "../components/admin/Tables/BanTable/reducer";
import { registrySheduleReducer} from "../components/admin/Schedule/RegistryShedule/reducer";
import {registerReducer} from '../components/pages/register/reducer';

const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
export const history = createBrowserHistory({ basename: baseUrl });




export default function configureStore (history, initialState) {
    const reducers = {
      login: loginReducer,
      refreshToken: refreshReducer,
      userTable: userTableReducer,
      banTable: banTableReducer,
      registryShedule: registrySheduleReducer,
      register: registerReducer
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
      router: connectRouter(history)
    });

    return createStore(
      rootReducer,
      initialState,
      compose(applyMiddleware(...middleware), ...enhancers)
    );
  }
