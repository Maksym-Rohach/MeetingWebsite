import axios from "axios";
import {serverUrl} from '../../config';

export default class BoysService {
    static boys(model) {
        return axios.post(`${serverUrl}api/boys/boys`, model)
    };
}