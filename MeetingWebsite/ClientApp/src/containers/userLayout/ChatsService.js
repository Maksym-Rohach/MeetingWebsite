import axios from "axios";
import {serverUrl} from '../../config';

export default class GetChatsService {

    static getChats(model) {
        return axios.post(`${serverUrl}api/chat/getchats`, model)
    };
    static informBack(model) {
        return axios.post(`${serverUrl}api/chat/informread`, model)
    };
    static sendMessage(model) {
        return axios.post(`${serverUrl}api/chat/sendmessage`, model)
    };


}