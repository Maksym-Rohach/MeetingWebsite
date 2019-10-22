import axios from "axios";
import {serverUrl} from '../../../../config';

export default class UserTableService {
    static userTable(model) {
        return axios.post(`${serverUrl}api/admin/users`, model)
    };
}