import axios from "axios";
import { serverUrl } from '../../../config';

export default class UserTableService {
    static getProfile(model) {
        return axios.get(`${serverUrl}api/userprofile/getprofile`, model)
    };
    static setProfile(model) {
        return axios.post(`${serverUrl}api/userprofile/setprofile`, model)
    };
    static editImage(avatar) {
        // const model= {avatar: avatar};
        //console.log("editImage ==============", model);
        return axios.post(`${serverUrl}api/userprofile/change-image`, {avatar})
    };
}