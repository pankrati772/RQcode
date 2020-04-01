import axios from 'axios'
var instance = axios.create();
// http://47.107.57.223/
// let devIP = 'http://192.168.4.64:8080'
let devIP = 'http://192.168.4.64:8080'
let LOCAL_PRODUCTION_IP = 'http://192.168.4.64:8080'
let PRODUCTION_IP =  'http://192.168.4.77:8080/autotest'
let LOACL_PRODUCTION_IP_2 = 'http://47.107.57.223:8081/autotest'
const AxiosProduction = () => {
    axios.defaults.baseURL = PRODUCTION_IP;
    // axios.defaults.headers.post['Content-Type'] = 'application/json';
    // axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
    // axios.defaults.headers.post['Access-Control-Allow-Headers'] = 'X-Requested-With,Content-Type'
    instance.defaults.timeout = 5000;
}
const AxiosDevelopment = () => {
    axios.defaults.baseURL = PRODUCTION_IP;
    instance.defaults.timeout = 5000;
}

const API = {
    // openlaser: '/temp/openAStopLaser',
    // openCom: '/temp/openAStopTemp',
    // getPortList: '/temp/getPortList',
    // getPortBurt: '/temp/getPortBurt ',
    // openAStopLaser: '/temp/openAStopLaser',
    // startTest: '/temp/startTest',
    // getKt15List: '/temp/getKt15List',
    // deleteData: '/temp/deleteData',
    // getAllByTemp: '/temp/getAllByTemp',
    // login: '/user/login',
    // getAll: '/plan/getAll',
    // getAllUser: '/sysuer/getAll',
    getReport: '/sys/report',
    // stopTest: '/sys/stoptest',
    // insertTemp: '/temp/insertTemp',
    // updateStatus: '/temp/updateStatus'
}
process.env.NODE_ENV === 'production' ? AxiosProduction() : AxiosDevelopment()
export const getReport = (devicefk) => {
    return new Promise((res, rej) => {
        let json = {
            devicefk
        }
        axios.post(API.getReport, json).then(data => res(data)).then(data => rej(data))
    })
}