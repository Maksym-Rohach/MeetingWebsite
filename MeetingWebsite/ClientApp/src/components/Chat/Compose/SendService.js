import axios from "axios";
import {serverUrl} from '../../../../src/config';

export default class SendService {
    static sendMessages(model) {
        return axios.post(`${serverUrl}api/chat/sendmessage`, model)
    };
}