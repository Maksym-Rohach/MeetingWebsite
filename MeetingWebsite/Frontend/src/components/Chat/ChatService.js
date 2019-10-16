import axios from "axios";
import {serverUrl} from '../../../config';

export default class ChatService {
    static GetMessages(count) {
        return axios.post(`${serverUrl}api/chat/loadmessages`, count)
    };
    static SendMessage(mess) {
        return axios.post(`${serverUrl}api/chat/sendmessage`, mess)
    };
    static AddChat(chat) {
        return axios.post(`${serverUrl}api/chat/sendmessage`, chat)
    };
}