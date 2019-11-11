import axios from "axios";
import {serverUrl} from '../../../config';

export default class Forgot_Password_Service {
    static forgot_password(model) {
        return axios.post(`${serverUrl}api/account/forgot_password`, model)
    };
}