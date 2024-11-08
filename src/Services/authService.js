import axios from "axios";
// import router from '@/router/index';
import { getToken } from "../utils/authToken";

axios.interceptors.request.use(
    function(config){
        config.headers['Accept'] = 'application/json';

        let token = getToken();
        
        if (token?.trim()?.length > 0) {
            console.log('Token:', token);
            
            config.headers['Authorization'] = 'Bearer ' + token;
        }
        config.headers['X-API-KEY'] = import.meta.env.VITE_API_KEY;

        config.baseURL = import.meta.env.VITE_API_BASE_URI;
        return config;
    },
    function(error){
        return Promise.reject(error);
    }
);

axios.interceptors.response.use(
    function(response){
        return response;
    },
    function(error){

        if (error?.response) {
            const { status } = error.response;

            if (status === 401) {

                // removeStorage(TOKEN_KEY);
                // router.push({path: '/login'});
            }

            if ([503].indexOf(status) >= 0) {
                // return router.push({ path: '/technical-error'});
            }

            if (status === 403) {
                // return router.push({ path: '/access-denied'});
            }

            if (status === 409) {
                // return router.push({ path: '/email/notice'});
            }
        }

        return Promise.reject(error);
    }
);

export default axios;