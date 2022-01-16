import { mainUrl } from "../../Constant";

class ClientService {
    getClient(serviceRequest, queryParams, resolve,reject){
        serviceRequest.get(mainUrl + '/gcs/getPeople' , queryParams, undefined  ,  resolve, reject)
    }
}

export default new ClientService();

