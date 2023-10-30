import { useEffect, useState } from 'react';
import MyProgressCard from '../components/progress/MyProgressCard'
import { RunApi, GetApiAll } from '../services/interface';
import { Button, Input, Card, message, Row, Col } from 'antd';
import MyUpload from '../components/MyUpload';
import MyUserList from '../components/MyUserList';
import MyClock from '../components/MyClock';
const Dashboard = () => {
    const [APIs, setAPIs] = useState([]);
    const [summary, setSummary] = useState("");
    // const [testcases, setTestcases] = useState(testcases_local);

    // RunApi(route.params?.api_id)

    useEffect(() => {
        GetApiAll().then(res => {
            console.log(res)
            if (res.code == 0) {
                setAPIs(res.data)
            } else {
                message.warning('Get API failed')
            }
        }).catch(err => {
            message.error(err)
        })
    }, [])

    useEffect(() => {
        console.log(APIs)
        let num = APIs.length
        if (num == 0) {
            setSummary("Oops~ Nothing here yet😯")
        } else {
            setSummary(`Total APIs: ${num}`)
        }
    }, [APIs])

    const Kanban = () => {
        const [inputValue, setInputValue] = useState('');

        return (
            <>
                <div>
                    5d6662e0-796c-4aa2-a70f-ec15f4521caa
                </div>
                <Input value={inputValue} onChange={e => setInputValue(e.target.value)} />
                <Button
                    type="primary"
                    onClick={() => {
                        // setApiId(inputValue)
                        // RunApi(inputValue).then(res => {
                        //     console.log(res)
                        //     if (res?.code == 0) {
                        //         setTestcases(res.data);
                        //     }
                        // })
                    }}
                >
                    Random Run Test
                </Button>
            </>
        )
    }
    return (
        <>
            <Card title="Summary">
                {summary}

            </Card>
            <Row style={{ marginTop: '20px' }}>
                <Col span={24}>
                    <Card title="Test Online">
                        <MyUpload></MyUpload>
                    </Card>
                </Col>

                {/* <Col span={16}>
                    <Card title="Visitors" style={{ marginLeft: '20px' }} >
                        <MyUserList style={{ height: '30vh', overflow: 'scroll' }} />
                    </Card>
                </Col> */}
            </Row>


        </>
    );
};

export default Dashboard;