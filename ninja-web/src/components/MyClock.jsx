import { useState, useEffect } from 'react';
import { Typography } from 'antd';
import moment from 'moment';

const { Title } = Typography;

function MyClock() {
    const [currentTime, setCurrentTime] = useState(moment().format('HH:mm:ss'));

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(moment().format('HH:mm:ss'));
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <div>
            <Title level={2}>{currentTime}</Title>
        </div>
    );
}

export default MyClock;