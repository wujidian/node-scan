import Axios from 'axios';
// axios request拦截 添加token
Axios.interceptors.request.use(
    config => {
        return config
    },
    error => {
        return Promise.reject(error)
    });

// axios响应拦截器，统一处理响应错误
Axios.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if (error.response) {
            console.log(error.response);
        }
        return Promise.reject(error.response.data)
    })
function getParameters() {
    // 设备型号
    let device = '';
    let is_iPd = navigator.userAgent.match(/(iPad|iPod|iPhone)/i) != null;
    let is_mobi = navigator.userAgent.toLowerCase().match(/(ipod|iphone|android|coolpad|mmp|smartphone|midp|wap|xoom|symbian|j2me|blackberry|win ce)/i) != null;
    if (is_iPd) {
        device = "phone";
    } else if (is_mobi) {
        device = "phone";
    } else {
        device = "pc";
    }
    return {
        device: device,
        lang: localStorage.getItem('lang') || 'zh_CN',
        timeZone: -(new Date()).getTimezoneOffset(),
        version: "all",
        passport: localStorage.getItem('passport'),
        t: Date.parse(new Date()) / 1000,
    }
}
// get请求
export function get(url, params) {
    return new Promise((resolve, reject) => {
        if (params !== undefined) {
            for (let key in params) {
                if (url.indexOf('{' + key + '}') != -1) {
                    url = url.replace('{' + key + '}', params[key].toString());
                    delete params[key]
                }
            }
        }
        let parameter = params;
        if (url.indexOf('passport') !== -1) {
            parameter = Object.assign({}, params, getParameters());
        }
        Axios.get(url, {
            params: parameter
        }).then(res => {
            if ((res.data.success && res.data.error == undefined) || res.data.success == undefined && !res.data.error) {
                resolve(res.data);
            } else if (!res.data.success || res.data.error) {
                reject(res.data);
            }
        }).catch(err => {
        })
    });
}
// post请求
export function post(url, params) {
    return new Promise(function (resolve, reject) {
        if (params !== undefined) {
            for (let key in params) {
                if (url.indexOf('{' + key + '}') != -1) {
                    url = url.replace('{' + key + '}', params[key].toString());
                    delete params[key]
                }
            }
        }
        let parameter = params;
        if (url.indexOf('passport') !== -1) {
            parameter = Object.assign({}, params, getParameters());
        }
        Axios.post(url, parameter)
            .then(res => {
                if ((res.data.success && res.data.error == undefined) || res.data.success == undefined && !res.data.error) {
                    resolve(res.data);
                } else if (!res.data.success || !res.data.error) {
                    reject(res.data);
                }
            })
            .catch(err => {
            })
    });
}
export function put(url, params) {
    return new Promise(function (resolve, reject) {
        if (params !== undefined) {
            for (let key in params) {
                if (url.indexOf('{' + key + '}') != -1) {
                    url = url.replace('{' + key + '}', params[key].toString());
                    delete params[key]
                }
            }
        }
        let parameter = params;
        if (url.indexOf('passport') !== -1) {
            parameter = Object.assign({}, params, getParameters());
        }
        Axios.put(url, parameter)
            .then(res => {
                if ((res.data.success && res.data.error == undefined) || res.data.success == undefined && !res.data.error) {
                    resolve(res.data);
                } else if (!res.data.success || res.data.error) {
                    reject(res.data);
                }
            })
            .catch(err => {
            })
    });
}
export function del(url, params) {
    return new Promise(function (resolve, reject) {
        if (params !== undefined) {
            for (let key in params) {
                if (url.indexOf('{' + key + '}') != -1) {
                    url = url.replace('{' + key + '}', params[key].toString());
                    delete params[key]
                }
            }
        }
        let parameter = params;
        if (url.indexOf('passport') !== -1) {
            parameter = Object.assign({}, params, getParameters());
        }
        Axios.delete(url, { parameter })
            .then(res => {
                if ((res.data.success && res.data.error == undefined) || res.data.success == undefined && !res.data.error) {
                    resolve(res.data);
                } else if (!res.data.success || res.data.error) {
                    reject(res.data);
                }
            })
            .catch(err => {
            })
    });
}