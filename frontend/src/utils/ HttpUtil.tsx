class HttpUtil{
    get = (url: string, queryParams: object, headers: object, resolve:(response?: object) => void,reject:(reason?: any) => void) =>{
        let completeUrl:string = url + this.getQueryString(queryParams as string[])
        const requestOptions = {
            method: 'GET',
            headers: headers
            };
        fetch(completeUrl, requestOptions as RequestInit)
        .then(response => response.json())
        .then(data => resolve(data))
        .catch((err) => reject(err))
    }

        getQueryString = function(queryParams: string[]) {
        let queryString = '';
        for(let param in queryParams){
            if(queryString === ''){
                queryString += '?';
            }else{
                queryString += '&'
            }
            queryString =queryString + param + '=' + queryParams[param]
        }

        return queryString;
    }

    
}

export default HttpUtil;