import axios from "axios";
import {serverUrl} from '../../config';

export default class ResetPasswordService {
    static resetPassword(model) {
        return axios.post(`${serverUrl}api/resetpassword/reset-pass`, model)
    };
}