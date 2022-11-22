import axios, { AxiosError, AxiosResponse } from "axios";
import { MartialArt } from "../models/martialArt";
import { Result} from "../models/Result";
import REACT_APP_API_URL from '../../constants';
import { toast } from "react-toastify";
import { history } from "../..";
import { store } from "../stores/store";
import { User, UserFormValues } from "../models/user";

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay)
    })
}
axios.defaults.baseURL = REACT_APP_API_URL;

axios.interceptors.request.use(config => {
    const token = store.commonStore.token;
    if(token) config.headers!.Authorization = `Bearer ${token}`
    return config;
})

axios.interceptors.response.use(async response => {
        await sleep(1000);
        return response;
}, (error: AxiosError) => {
    {/*Dodao sam data: any; status: number. Zasto? :D */}
    const {data, status, config}: {data: any; status: number, config: any} = error.response!;
    switch(status){
        case 400:
            if(typeof data === 'string') toast.error(data);
            if(config.method === 'get' && data.errors.hasOwnProperty('id')){
                history.push('/not-found');
            }
            if(data.errors){
                const modalStateErrors = [];
                for(const key in data.errors){
                    if(data.errors[key]){
                        modalStateErrors.push(data.errors[key]);
                    }
                }
                throw modalStateErrors.flat();
            }
            break;
        case 401: 
            toast.error('unauthorised');
            break;
        case 404:
            history.push('/not-found');
            break;
        case 500: 
            store.commonStore.setServerError(data);
            history.push('/server-error');
            break;             
    }
    return Promise.reject(error);
})


const responseBody = <T> (response: AxiosResponse<T>) => response.data;

const requests = {
    get: <T> (url: string) => axios.get<T>(url).then(responseBody),
    post: <T> (url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T> (url: string, body:{}) => axios.put<T>(url, body).then(responseBody),
    delete: <T> (url: string) => axios.delete<T>(url).then(responseBody)
}

const MartialArts ={
    list: () => requests.get<Result<MartialArt[]>>('/martialart'),
    details: (id: string) => requests.get<MartialArt>(`/martialart/${id}`),
    create: (martialArt: MartialArt) => requests.post<MartialArt>('/martialart', martialArt ),
    edit: (martialArt: MartialArt) => requests.put<MartialArt>('/martialart', martialArt ),
    delete: (id: number) => requests.delete(`/martialart/${id}`),
}

const Account = {
    current: () => requests.get<User>('/account'),
    login: (user: UserFormValues) => requests.post<User>('/account/login', user),
    retgister: (user: UserFormValues) => requests.post<User>('/account/register', user)
}


const agent = {
    MartialArts,
    Account
}

export default agent;