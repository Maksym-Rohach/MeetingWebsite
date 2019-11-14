import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { loginReducer } from "../components/pages/login/reducer";
import { refreshReducer } from '../components/refreshToken/reducer';
import refreshTokenMiddleware from './middleware/refreshTokenMiddleware';
import { userTableReducer } from "../components/admin/Tables/UserTable/reducer";
// import { createBrowserHistory } from 'history';
import createHistory from 'history/createHashHistory';
import { banTableReducer } from "../components/admin/Tables/BanTable/reducer";
import { registrySheduleReducer } from "../components/admin/Schedule/RegistryShedule/reducer";
import { registerReducer } from '../components/pages/register/reducer';
import {adminTableReducer} from '../components/admin/Tables/AdminTable/reducer';
import {vipTableReducer} from '../components/admin/Tables/VipTable/reducer';
// import { registerReducer } from '../components/pages/register/reducer'; 
import { boysReducer } from '../components/boys/reducer';
import { getChatsReducer, sendMessageReducer, informBackReducer } from '../containers/userLayout/reducer';
import {getMessagesReducer} from '../components/Chat/chat/reducer'
import { homeReducer } from '../components/pages/Home/reducer';
import { userProfileReducer } from '../components/Users/UserProfile/reducer';
//import { MessageListReducer } from "../components/Chat/MessageList/reduser";
const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
export const history = createHistory({ basename: baseUrl });




export default function configureStore(history, initialState) {
    const reducers = {
        login: loginReducer,
        refreshToken: refreshReducer,
        userTable: userTableReducer,
        banTable: banTableReducer,
        registryShedule: registrySheduleReducer,
        boys: boysReducer,
        register: registerReducer,
        userProf: userProfileReducer,
        messages: getMessagesReducer,
        home: homeReducer,
        chats:getChatsReducer,
        sendMessage:sendMessageReducer,
        informBack:informBackReducer
    };

    const middleware = [
      thunk,
        refreshTokenMiddleware(),
     // signalRMiddleware(),
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
