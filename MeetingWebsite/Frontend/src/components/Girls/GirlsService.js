import axios from "axios";
import {serverUrl} from '../../../config';

export default class GirlsService {
    static girls(model) {
        return axios.post(`${serverUrl}api/account/girls`, model)
    };
}