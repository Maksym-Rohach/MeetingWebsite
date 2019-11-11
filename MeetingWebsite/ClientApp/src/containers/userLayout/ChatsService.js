import axios from "axios";
import {serverUrl} from '../../config';

export default class GetChatsService {

    static getChats(model) {
        return axios.post(`${serverUrl}api/chat/getchats`, model)
    };

}