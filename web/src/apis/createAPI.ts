import { backendRequest, BackendRequestOptions } from "./api";
interface CreateApiTemplate {
    "api_name": "update user information",
    "api_url": "https://www.testprj.com/api/user",
    "api_method": "PUT",
    "api_respose": {
        "success_code_value": "0",
        "success_code_type": "number",
        "fail_code_value": "999",
        "fail_code_type": "number"
    },
    "api_body": [
        {
            "para_name": "userid",
            "para_type": "number",
            "para_required": true,
            "number_para_constrain": {
                "min": -1,
                "max": 100
            }
        },
        {
            "para_name": "username",
            "para_type": "string",
            "para_required": true
        },
        {
            "para_name": "user_language",
            "para_type": "string",
            "para_required": true,
            "string_para_constrain": [
                "zh-cn",
                "zh-hk",
                "zh-tw"
            ]
        },
        {
            "para_name": "user_detail",
            "para_type": "object",
            "para_required": false,
            "object_para_constrain": [
                {
                    "para_name": "user_gender",
                    "para_type": "string",
                    "para_required": true,
                    "string_para_constrain": [
                        "male",
                        "female",
                        "other"
                    ]
                },
                {
                    "para_name": "user_age",
                    "para_type": "number",
                    "para_required": true,
                    "number_para_constrain": {
                        "min": 18,
                        "max": 120
                    }
                }
            ]
        }
    ]
}

export const createAPI = async (requestData: any) => {
    try {
        const options: BackendRequestOptions<CreateApiTemplate> = {
            url: '/api/interface',
            method: 'POST',
            data: <CreateApiTemplate>requestData
        };

        const responseData = await backendRequest<CreateApiTemplate>(options);
        console.log('Response:', responseData);
    } catch (error) {
        if (error instanceof Error) {
            console.error('Error sending data:', error.message);
        } else {
            console.error('Unknown error occurred:', error);
        }
    }
};