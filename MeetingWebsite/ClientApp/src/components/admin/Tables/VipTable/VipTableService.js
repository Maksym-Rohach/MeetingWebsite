import axios from "axios";
import {serverUrl} from '../../../../config';

export default class VipTableService {
    static vipTable(model) {
        return axios.post(`${serverUrl}api/admin/vips`, model)
    };
}