import * as React from 'react';
import ResponsiveAppBar from './AppBar';
import StickyHeadTable from './datatable';
import { Container } from '@mui/system';
import { getlocalstore } from '../utils/localstorage';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import CreateAPI from './CreateAPI';
import ListAPI from './ListAPI';

export default function HomePage() {
    //check userinfo on render
    const userinfo = getlocalstore('userinfo');
    const navigate = useNavigate();
    const [navfcn, setNavfcn] = React.useState('');

    useEffect(() => {
        if (!userinfo || !userinfo.token) {
            navigate('/login');
        }
    }, [navigate, userinfo]);

    const handleSwitchNav = (event: string) => {
        // 在这里处理来自 ResponsiveAppBar 组件的事件
        console.log('Event from ResponsiveAppBar:', event);
        setNavfcn(event);
    };

    return <div>
        <ResponsiveAppBar switchNav={handleSwitchNav} />
        <Container maxWidth='xl'
            sx={{
                marginTop: 5
            }}>
            {navfcn == 'ADD' && <CreateAPI />}
            {navfcn == 'LIST' && <ListAPI />}
        </Container>
        {/* <StickyHeadTable /> */}

    </div>;
}
