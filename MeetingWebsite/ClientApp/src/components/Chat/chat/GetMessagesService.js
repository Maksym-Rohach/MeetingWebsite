import axios from "axios";
import {serverUrl} from '../../../config';

export default class GetMessageService {

    static getMessages(model) {
        return axios.post(`${serverUrl}api/chat/loadmessages`, model)
    };

}