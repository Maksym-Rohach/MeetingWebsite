import axios from "axios";
import {serverUrl} from '../../../../config';

export default class RegistrySheduleService {
    static registryShedule(model) {
        return axios.post(`${serverUrl}api/admin/shedule-register`, model)
       
    };
}