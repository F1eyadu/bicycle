import JsonP from 'jsonp'
import axios from 'axios'
import {Modal} from 'antd'
export default class Axios {
    static jsonp(options) {
        return new Promise((resolve, reject) => {
            JsonP(options.url, {
                param: 'callback'
            }, function (err, response) {
                if (response.status === 'success') {
                    resolve(response);
                } else {
                    reject(response.messsage);
                }
            })
        })
    }

    static getData(options){
        let baseURL = ' https://www.easy-mock.com/mock/5c00d11fb5ca4f6a533ac6dd/bicycleApi'
        return new Promise((resolve, reject)=>{
            axios({
                url: options.url,
                method: 'get',
                baseURL: baseURL,
                timeout: 5000,
                params: (options.data && options.data.params) || ''
            }).then((res) =>{
                if(res.status == 200){
                    if(res.data.data.code == 0){
                        resolve(res)
                    }else{
                        Modal.info({
                            title: '提示',
                            content: res.msg
                        })
                    }
                }else{
                    reject(res)
                }
            })
        })
    }
}