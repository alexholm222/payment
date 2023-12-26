import axios from 'axios'

const instanceWithToken = axios.create({
    withCredentials: false,
    baseURL: `https://api2.skilla.ru/`
})

const token = document.getElementById('root_payment').getAttribute('token');

instanceWithToken.interceptors.request.use(config => {
    config.headers.Authorization = token
    return config
});

export const getPaymentList = (date) => {
    return instanceWithToken.get(`https://api2.skilla.ru/api/pays?date=${date}`);
}

export const enablePro = (date) => {
    return instanceWithToken.post(`https://api2.skilla.ru/api/pays/enable-pro?date=${date}`);
}

export const disablePro = (date) => {
    return instanceWithToken.post(`https://api2.skilla.ru/api/pays/disable-pro?date=${date}`);
}

/* export const sendTask = (clientId, date) => {
    return instanceWithToken.post(`https://api2.skilla.ru/api/requests/${clientId}/task?date=${date}`);
}
 */
