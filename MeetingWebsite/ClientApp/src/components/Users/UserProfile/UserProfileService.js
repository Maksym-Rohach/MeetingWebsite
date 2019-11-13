import axios from "axios";
import { serverUrl } from '../../../config';

export default class UserTableService {
    static getProfile(model) {
        return axios.get(`${serverUrl}api/userprofile/getprofile`, model)
    };
    static setProfile(model) {
        return axios.post(`${serverUrl}api/userprofile/setprofile`, model)
    };
}