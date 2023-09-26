import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
const BaseUrl = "http://127.0.0.1:5000";

export interface BackendRequestOptions<T> {
    url: string;
    method?: string;
    data?: T;
}

export const backendRequest = async <T>(options: BackendRequestOptions<T>): Promise<T> => {
    try {
        const { url, method = 'GET', data } = options;
        const response: AxiosResponse<T> = await axios({
            method,
            url: BaseUrl + url,
            data,
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        } else {
            throw new Error("unknown error");
        }
    }
};
