import {
    JsonHubProtocol,
    HubConnectionBuilder
} from '@aspnet/signalr';
// import { approveReceived } from '../../components/Order/actions';
// import { orderReceived } from '../../components/Waiter/actions';
// import { getDataFromLocal } from '../../utils';
// //import BaseService from '../../services/Base/BaseService';
// import {serverUrl} from '../../config';

// const startSignalRConnection = (connection) => {
//     connection.start()
//         .then(() => console.info('SignalR Connected'))
//         .catch(err => console.error('SignalR Connection Error: ', err))
// };
// const connectionHub = serverUrl + 'api/' + 'clientwaiter';

// const protocol = new JsonHubProtocol();
// const connection = new HubConnectionBuilder()
//     .withUrl(connectionHub, { accessTokenFactory: () => getDataFromLocal("tokens").jwtToken })
//     .withHubProtocol(protocol)
//     .build();

export default function signalRMiddleware() {
    return ({ dispatch, getState }) => next => (action) => {
        // switch (action.type) {
        //     case 'USER_LOGGED_IN':
        //         {
        //             connection.on('ReceiveOrder', (order) => { dispatch(orderReceived(order)) });
        //             connection.on('ReceiveApprove', (declinedIds) => { dispatch(approveReceived(declinedIds)) });
        //             // // re-establish the connection if connection dropped
        //             connection.onclose(() => setTimeout(startSignalRConnection(connection), 5000));
        //             startSignalRConnection(connection);
        //             break;
        //         }
        //     case 'SEND_ORDER':
        //         {
        //             console.log(action.payload)
        //             connection.invoke("SendOrder", action.payload).catch(err => console.error(err.toString()));
        //             break;
        //         }
        //     case 'SEND_APPROVE':
        //         {
        //             console.log(action.payload)
        //             connection.invoke("SendApprove", action.payload).catch(err => console.error(err.toString()));
        //             break;
        //         }
        //     default: break;
        // }
        return next(action);
    }
}