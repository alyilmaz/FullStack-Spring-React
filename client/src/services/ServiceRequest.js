import { v1 as uuidv1 } from 'uuid';
import HttpUtil from '../utils/HttpUtil';

class ServiceRequest {
    constructor() {
        const uuidOptions = {};

        this.correlationId = uuidv1(uuidOptions);
        this.headers = {
            'X-Correlation-Id': this.correlationId,
        };
        this.httpUtil = new HttpUtil();
        

    }

    get(url, queryParams, headers, callback, errorCallBack) {
        if(!headers){
            headers ={}
        }
        headers = Object.assign(headers, this.headers)
        this.httpUtil.get(url, queryParams, headers, callback, errorCallBack);
    }
}

export default ServiceRequest;