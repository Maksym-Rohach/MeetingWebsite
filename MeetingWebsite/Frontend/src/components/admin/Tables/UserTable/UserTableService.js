import axios from "axios";
import {serverUrl} from '../../../config';

export default class LoginService {
    static usertable(model) {
        return axios.post(`${serverUrl}api/admin/users`, model)
    };
}