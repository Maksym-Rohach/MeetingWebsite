import axios from "axios";
import {serverUrl} from '../../../config';

export default class HomeService {
    static home() {
        return axios.get(`${serverUrl}api/home/random`)
    };
}