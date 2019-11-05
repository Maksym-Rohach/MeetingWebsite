import axios from "axios";
import {serverUrl} from '../../../../src/config';

export default class MessagesListService {
    static getMessages(model) {
        return axios.post(`${serverUrl}api/chat/loadmessages`, model)
    };
}