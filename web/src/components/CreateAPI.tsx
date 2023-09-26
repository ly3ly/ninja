import * as React from 'react';
import ResponsiveAppBar from './AppBar';
import { Container } from '@mui/system';
import { useEffect } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { createAPI } from '../apis/createAPI';


export default function CreateAPI() {
    const mockdata = {
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
    const [showNodal, setShowNodal] = React.useState(false);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log(mockdata);

        //传到后端
        const res = createAPI(mockdata);


    };

    return <div>
        <div>
            这里应该有个表单（录入信息，生成下面的json，谁有兴趣开发？）
        </div>

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <div>
                {JSON.stringify(mockdata)}
            </div>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
            >
                创建
            </Button>
        </Box>

    </div>;
}
