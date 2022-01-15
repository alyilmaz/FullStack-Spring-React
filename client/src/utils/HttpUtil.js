class HttpUtil {
    get = function(url, queryParams,headers, resolve, reject){
        let completeUrl = url + this.getQueryString(queryParams)
        const requestOptions = {
            method: 'GET',
            headers: headers
            };
        fetch(completeUrl, requestOptions)
        .then(response => response.json())
        .then(data => resolve(data))
        .catch((err) => reject(err))
    }

        getQueryString = function(queryParams) {
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