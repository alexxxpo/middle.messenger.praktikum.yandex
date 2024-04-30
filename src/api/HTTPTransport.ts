const METHODS = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
};

function queryStringify(data: any): string { // не знаем какие данные получим
    const arr = []; 
    for (let key in data) {
        arr.push(key.toString() + '=' + data[key].toString());
    }
    return '?' + arr.join('&');
}

type OptionsType = {
    method: string
    data: Document | XMLHttpRequestBodyInit | null | undefined
    headers: Record<string, string>
    timeout: number
}

type HTTPMethod = (url: string, options: OptionsType) => Promise<unknown>

export default class HTTPTransport {
    get: HTTPMethod = (url, options) => {
        const params = queryStringify(options.data)
        return this.request(url + params, { ...options, method: METHODS.GET }, options.timeout as number);
    };

    put: HTTPMethod = (url, options) => {
        return this.request(url, { ...options, method: METHODS.PUT }, options.timeout as number);
    }

    post: HTTPMethod = (url, options) => {
        return this.request(url, { ...options, method: METHODS.POST }, options.timeout as number);
    }

    delete: HTTPMethod = (url, options) => {
        return this.request(url, { ...options, method: METHODS.DELETE }, options.timeout as number);
    }

    request = (url: string, options: OptionsType, timeout = 5000) => {
        const { method, data, headers } = options;

        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open(method as string, url);

            for (let header in headers as Record<string, string>) {
                xhr.setRequestHeader(header.toString(), headers[header].toString());
            }


            xhr.onload = function () {
                resolve(xhr);
            };

            xhr.onabort = reject;

            xhr.onerror = reject;

            xhr.timeout = timeout;

            xhr.ontimeout = reject;

            if (method === METHODS.GET || data === undefined) {
                xhr.send();
            } else {
                xhr.send(data);
            }
        });
    };
}
