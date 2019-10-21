import axios from "axios";
import {serverUrl} from '../../../../config';

export default class AdminTableService {
    static adminTable(model) {
        return axios.post(`${serverUrl}api/admin/admins`, model)
    };
}