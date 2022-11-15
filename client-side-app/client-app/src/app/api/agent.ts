import axios, { AxiosResponse } from "axios";
import { MartialArt } from "../models/martialArt";
import { Result} from "../models/Result";
import REACT_APP_API_URL from '../../constants';

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay)
    })
}
axios.defaults.baseURL = 'https://martialartapp.herokuapp.com/';

axios.interceptors.response.use(async response => {
    try{ await sleep(1000)
        return response
    }catch(error){
        console.log(error);
        return Promise.reject(error);
    };
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


const agent = {
    MartialArts
}

export default agent;