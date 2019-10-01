import axios from "axios";
import {serverUrl} from '../../config';
export default class RefreshService {
    static RefreshToken = () => {
        const token = localStorage.getItem('refreshToken');
        return axios.post(`${serverUrl}api/account/refresh/${token}`);
    }
}
