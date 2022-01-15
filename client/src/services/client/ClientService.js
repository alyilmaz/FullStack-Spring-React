const mainUrl = "http://localhost:8080/gcs";

class ClientService {
    getClient(serviceRequest, queryParams, resolve,reject){
        serviceRequest.get(mainUrl + '/getPeople' , queryParams, undefined  ,  resolve, reject)
    }
}

export default new ClientService();

