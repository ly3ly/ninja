import { backendRequest, BackendRequestOptions } from "./api";
interface ListApiTemplate {
    start_page: string,
    page_size: string
}

export const listAPI = async (requestData: any) => {
    try {
        const options: BackendRequestOptions<ListApiTemplate> = {
            url: '/api/interfaces',
            method: 'POST',
            data: <ListApiTemplate>requestData
        };

        const responseData = await backendRequest<ListApiTemplate>(options);
        // console.log('Response:', responseData);
        return responseData
    } catch (error) {
        if (error instanceof Error) {
            console.error('Error sending data:', error.message);
        } else {
            console.error('Unknown error occurred:', error);
        }
    }
};