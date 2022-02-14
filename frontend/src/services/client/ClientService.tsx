import { mainUrl } from "../../Constant";
import ServiceRequest from "../ServiceRequest";

class ClientService {
    getClient(serviceRequest: ServiceRequest, queryParams: object, resolve:(result?: any) => void,reject:(reason?: any) => void){
        serviceRequest.get(mainUrl + '/gcs/getPeople' , queryParams, {} ,  resolve, reject)
    }
}

export default new ClientService();