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
    return instanceWithToken.get(`https://api2.skilla.ru/api/pays/?date=${date}`);
}

export const enablePro = (date, id) => {
    return instanceWithToken.post(`https://api2.skilla.ru/api/pays/enable-pro?date=${date}&id=${id}`);
}

export const disablePro = (date, id) => {
    return instanceWithToken.post(`https://api2.skilla.ru/api/pays/disable-pro?date=${date}&id=${id}`);
}

export const enableBuh = (date, id) => {
    return instanceWithToken.post(`https://api2.skilla.ru/api/pays/enable-buh?date=${date}&id=${id}`);
}

export const disableBuh = (date, id) => {
    return instanceWithToken.post(`https://api2.skilla.ru/api/pays/disable-buh?date=${date}&id=${id}`);
}

export const enableSeo = (date, id) => {
    return instanceWithToken.post(`https://api2.skilla.ru/api/pays/enable-seo?date=${date}&id=${id}`);
}

export const disableSeo = (date, id) => {
    return instanceWithToken.post(`https://api2.skilla.ru/api/pays/disable-seo?date=${date}&id=${id}`);
}

export const enableSeoEx = (date, id) => {
    return instanceWithToken.post(`https://api2.skilla.ru/api/pays/enable-seoex?date=${date}&id=${id}`);
}

export const disableSeoEx = (date, id) => {
    return instanceWithToken.post(`https://api2.skilla.ru/api/pays/disable-seoex?date=${date}&id=${id}`);
}

export const getPayForm = (sum) => {
    return instanceWithToken.get(`https://api2.skilla.ru/api/pays/form?sum=${sum}`);
}

export const trustPay = (days) => {
    return instanceWithToken.post(`https://api2.skilla.ru/api/pays/trust-payment?days=${days}`);
}


/* export const sendTask = (clientId, date) => {
    return instanceWithToken.post(`https://api2.skilla.ru/api/requests/${clientId}/task?date=${date}`);
}
 */
