import axios from "axios";
import {serverUrl} from '../../../../src/config';

export default class ChatService {
    static getMessages(model) {
        return axios.post(`${serverUrl}api/chat/loadmessages`, model)
    };
    static sendMessage(model) {
        return axios.post(`${serverUrl}api/chat/sendmessage`, model)
    };
    static getChats(model) {
        return axios.post(`${serverUrl}api/chat/getchats`, model)
    };
    static deleteMessage(model) {
        return axios.post(`${serverUrl}api/chat/deletemessage`, model)
    };
}