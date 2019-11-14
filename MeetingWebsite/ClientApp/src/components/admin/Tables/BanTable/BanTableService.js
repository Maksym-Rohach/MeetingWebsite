import axios from "axios";
import {serverUrl} from '../../../../config';

export default class BanTableService {
    static banTable(model) {
        return axios.post(`${serverUrl}api/admin/ban-list`, model)
    };
    static unbanUser(model) {
        return axios.post(`${serverUrl}api/admin/unbanuser`, model)
    };
}