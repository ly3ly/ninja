import * as React from 'react';
import ResponsiveAppBar from './AppBar';
import { Container } from '@mui/system';
import { useEffect } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { listAPI } from '../apis/listAPI';

interface ListAPIResponse {
    code: number,
    message: string,
    data: {
        total: number,
        value: any[]
    }
}

export default function ListAPI() {
    const [listData, setListData] = React.useState<ListAPIResponse>({ code: 0, message: '', data: { total: 0, list: [] } });
    useEffect(() => {
        fetchList().then(res => {
            if (res.code === 0) {
                setListData(res);
            }
        });
        // data as unknown as ListAPIResponse
    }, [])

    const fetchList = async (): Promise<ListAPIResponse> => {
        //加载数据
        const req = {
            start_page: 0,
            page_size: 10,
        }
        // console.log('加载数据 req:', req);
        const res = await listAPI(req);
        const data = res as unknown as ListAPIResponse
        return data;
    }

    return <div>
        <div>
            这里应该有个表单（录入信息，解析下面的json，谁有兴趣开发？）
        </div>
        <div>{listData.data && listData.data.value && JSON.stringify(listData.data.value)}</div>

    </div>;
}
