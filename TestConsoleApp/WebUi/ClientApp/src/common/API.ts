import axios, { AxiosResponse, Method } from "axios";

export const axiosGet = async (route: string): Promise<AxiosResponse>   => {return await apiCall(route, 'get')}
export const axiosPost = async (route: string, body: object = {}) : Promise<AxiosResponse> => {return await apiCall(route, 'post', body)}
export const axiosPut = async (route: string,  body: object = {}): Promise<AxiosResponse>  => {return await apiCall(route, 'put', body)}
export const axiosDelete = async (route: string, body: object = {}): Promise<AxiosResponse>  => {return await apiCall(route, 'delete', body)}



 const  apiCall =  async (route: string, method: Method, body: object = {}): Promise<AxiosResponse>  =>  {
    const request =  axios ({
        method: method,
        url: route,
        data: body
    })
    request
    .then(
        response => {
            return response; 
        }
    )
    .catch(error => {
        return error;
    }) 
    return request;
}