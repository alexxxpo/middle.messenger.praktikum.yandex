const METHODS = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
};

/**
* Функцию реализовывать здесь необязательно, но может помочь не плодить логику у GET-метода
* На входе: объект. Пример: {a: 1, b: 2, c: {d: 123}, k: [1, 2, 3]}
* На выходе: строка. Пример: ?a=1&b=2&c=[object Object]&k=1,2,3
*/
function queryStringify(data) {
// Можно делать трансформацию GET-параметров в отдельной функции
const arr = [];
for(let key in data) {
    arr.push(key.toString() + '=' + data[key].toString());
}
return '?' + arr.join('&');
}

export class HTTPTransport {
    get = (url, options = {}) => {
            const params = queryStringify(options.data)
            return this.request(url + params, {...options, method: METHODS.GET}, options.timeout);
    };

    put = (url, options = {}) => {
            return this.request(url, {...options, method: METHODS.PUT}, options.timeout);
    }

    post = (url, options = {}) => {
            return this.request(url, {...options, method: METHODS.POST}, options.timeout);
    }

    delete = (url, options = {}) => {
            return this.request(url, {...options, method: METHODS.DELETE}, options.timeout);
    }

    // PUT, POST, DELETE

    // options:
    // headers — obj
    // data — obj
    request = (url, options, timeout = 5000) => {
            const {method, data, headers} = options;

            return new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.open(method, url);

                for(let header in headers) {
                        xhr.setRequestHeader(header.toString(), headers[header].toString());
                }					

                
                xhr.onload = function() {
                    resolve(xhr);
                };
        
                xhr.onabort = reject;

                xhr.onerror = reject;

                xhr.timeout = timeout;
                xhr.ontimeout = reject;
                
                if (method === METHODS.GET || !data) {
                    xhr.send();
                } else {
                    xhr.send(data);
                }
            });
    };
}

function fetchWithRetry(url, options) {
    // код
    const query = new HTTPTransport().request;
    const {tries = 1} = options;

function onError(err){
    const triesLeft = tries - 1;
    if (!triesLeft){
        throw err;
    }

    return fetchWithRetry(url, {...options, tries: triesLeft});
}

return query(url, options).catch(onError);
}