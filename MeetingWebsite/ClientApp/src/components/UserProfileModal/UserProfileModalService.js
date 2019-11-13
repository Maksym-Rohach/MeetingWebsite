import axios from "axios";
import {serverUrl} from '../../config';

export default class UserProfileModalService {
    static getUserInfo(model) {
        return axios.post(`${serverUrl}api/userprofilemodal/get-user`, model)
    };
    static sayHello(model) {
        return axios.post(`${serverUrl}api/chat/sendmessage`,model)
    };
}