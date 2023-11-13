/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import ProgressItem from "./progressItem";
import { DownloadOutlined } from "@ant-design/icons";
import { Button, Card, Typography, Space, Tooltip } from "antd";
const { Text } = Typography;
import { saveAs } from 'file-saver';


const formatInteractions = (desp, method, path, req_body, res_body) => {
    return `{
        "description": "${desp}",
        "request": {
            "method": "${method}",
            "path": "${path}",
            "body": ${req_body}
        },
        "response": {
            "status": 200,
            "headers": {
                "Content-Type": "application/json"
            },
            "body": ${res_body}
        },
        "providerStates": [
            {
                "name": "test ${desp}"
            }
        ]
    },
    {
        "description": "${desp}",
    }`
}
const formatPactFile = (interactions) => {
    let txt = ""
    for (let i = 0; i < interactions.length; i++) {
        txt += interactions[i] + ","
    }
    txt.slice(0, -1)
    return `{
        "provider": {
            "name": "test_provider"
        },
        "consumer": {
            "name": "test_consumer"
        },
        "interactions": [${txt}],
        "metadata": {
            "pact-specification": {
                "version": "3.0.0"
            },
            "pact-jvm": {
                "version": "3.6.3"
            }
        }
    }`
}


const MyProgressCard = (props) => {

    const { testcases, info } = props
    const { success_cases, error_cases, border_cases } = testcases
    const [startProgress, setStartProgress] = useState(false);
    // const [tabContent, setTabContent] = useState({});
    const [progressList, setProgressList] = useState([]);
    const [activeOutputTabKey, setActiveOutputTabKey] = useState('success_cases');

    const [success_cases_output, setSuccessCasesOutput] = useState([]);
    const [error_cases_output, setErrorCasesOutput] = useState([]);
    const [border_cases_output, setBorderCasesOutput] = useState([]);




    const tabListNoTitle = [
        {
            key: 'success_cases',
            label: 'Success cases',
        },
        {
            key: 'error_cases',
            label: 'Error cases',
        },
        {
            key: 'border_cases',
            label: 'Border cases',
        },
    ];


    var contentListNoTitle = {
        [tabListNoTitle[0].key]: <Space direction="vertical" style={{ overflow: 'scroll', width: '100%' }}>{success_cases_output}</Space>,
        [tabListNoTitle[1].key]: <Space direction="vertical" style={{ overflow: 'scroll', width: '100%' }}>{error_cases_output}</Space>,
        [tabListNoTitle[2].key]: <Space direction="vertical" style={{ overflow: 'scroll', width: '100%' }}>{border_cases_output}</Space>,
    };

    const setCaseOutputFunc = (_key, txt, _type) => {
        switch (_key) {
            case tabListNoTitle[0].key:
                if (_type == 'onFinish') {
                    setSuccessCasesOutput(txt)
                } else {
                    setSuccessCasesOutput(prev => {
                        return prev[prev.length - 1]?.props?.type == "success" ? [...prev.slice(0, prev.length - 1), txt] : [...prev, txt]
                    });
                }
                break;
            case tabListNoTitle[1].key:
                if (_type == 'onFinish') {
                    setErrorCasesOutput(txt)
                } else {
                    setErrorCasesOutput(prev => {
                        return prev[prev.length - 1]?.props?.type == "success" ? [...prev.slice(0, prev.length - 1), txt] : [...prev, txt]
                    });
                }
                break;
            case tabListNoTitle[2].key:
                if (_type == 'onFinish') {
                    setBorderCasesOutput(txt)
                } else {
                    setBorderCasesOutput(prev => {
                        return prev[prev.length - 1]?.props?.type == "success" ? [...prev.slice(0, prev.length - 1), txt] : [...prev, txt]
                    });
                }
                break;
            default:
                break;
        }
    }

    const onFinishFunc = (res) => {
        if (res?.fail != 0) {
            let output = []
            let txt = <Text type="warning" key={-1}>Total {res.fail + res.success} cases, {res.fail} fail, {res.success} success</Text>
            output.push(txt)
            res?.failData.forEach((element, key) => {
                output.push(<Text type="danger" key={key}>[{key + 1}/{res?.failData?.length}] Fail <Text type="secondary">{JSON.stringify(element?.case)}</Text> <br /> <Text type="danger">Response {JSON.stringify(element?.response)}</Text> </Text>)
            });
            return output
        } else {
            let txt = <Text type="success" key={-1}>Total {res.fail + res.success} cases run successfully!</Text>
            return [txt]
        }
    }

    const onUpdateFunc = (res) => {
        if (res?.success) {
            return <Text type="success" key={res.key}>[{res.key + 1}/{success_cases.length}] success</Text>
        } else {
            return <Text type="danger" key={res.key}>[{res.key + 1}/{success_cases.length}] error <Text type="secondary">{JSON.stringify(res?.data?.case)}</Text> <br /> <Text type="danger">Response {JSON.stringify(res?.data?.response)}</Text></Text>
        }
    }

    useEffect(() => {
        console.log('testcases change', testcases)
        setStartProgress(false); // 清空数据
        setSuccessCasesOutput([]);
        setErrorCasesOutput([]);
        setBorderCasesOutput([]);

        let progressList = []
        for (let key in testcases) {
            progressList.push({
                task_name: key,
                tasks: testcases[key],
                onFinish: (res) => {
                    setCaseOutputFunc(key, onFinishFunc(res), 'onFinish')
                },
                onUpdate: (res) => {
                    setCaseOutputFunc(key, onUpdateFunc(res), 'onUpdate')
                }
            })

        }

        setProgressList(progressList)
    }, [testcases])


    const downloadCaseBtnClick = () => {
        // console.log('info', info)
        const fileName = `${info.key}_api-cases.json`;
        let filedata = {
            api_info: info,
            testcases: testcases
        }
        const blob = new Blob([JSON.stringify(filedata)], { type: 'text/plain;charset=utf-8' });
        saveAs(blob, fileName);
    };

    const downloadPactBtnClick = () => {
        let interactions = []
        for (let i = 0; i < testcases.success_cases.length; i++) {
            let tcase = testcases.success_cases[i]
            let req_body = JSON.stringify(tcase.request);
            let res_body = `{"${info.api_response.code_name}": matching(equalTo,${tcase.response.code})}`
            let interaction = formatInteractions(info.api_name, info.api_method, info.api_url, req_body, res_body)
            interactions.push(interaction)
        }
        for (let i = 0; i < testcases.border_cases.length; i++) {
            let tcase = testcases.border_cases[i]
            let req_body = JSON.stringify(tcase.request);
            let res_body = `{"${info.api_response.code_name}": matching(equalTo,${tcase.response.code})}`
            let interaction = formatInteractions(info.api_name, info.api_method, info.api_url, req_body, res_body)
            interactions.push(interaction)
        }
        for (let i = 0; i < testcases.error_cases.length; i++) {
            let tcase = testcases.error_cases[i]
            let req_body = JSON.stringify(tcase.request);
            let res_body = `{"${info.api_response.code_name}": matching(!equalTo,${tcase.response.code})}`
            let interaction = formatInteractions(info.api_name, info.api_method, info.api_url, req_body, res_body)
            interactions.push(interaction)
        }
        const fileName = `${info.key}_api-pact.json`;
        let filedata = formatPactFile(interactions)
        const blob = new Blob([filedata], { type: 'text/plain;charset=utf-8' });
        saveAs(blob, fileName);
    }

    return (
        <>
            <Card title={"Total cases: " + (success_cases.length + error_cases.length + border_cases.length)}>
                {progressList.map((item, key) => {
                    return (
                        <ProgressItem onStart={startProgress}
                            task_name={item.task_name}
                            tasks={item.tasks}
                            info={info}
                            onFinish={item.onFinish}
                            onUpdate={item.onUpdate}
                            key={key}
                        ></ProgressItem>
                    )
                })}
            </Card>



            {info?.url_reachable ? <Button
                style={{
                    margin: '10px',
                }}
                type='primary'
                onClick={() => {
                    setStartProgress(!startProgress)
                }}>
                Run Test Online
            </Button> : <Tooltip title="You can't run tests online. This may result from an unreachable URL.">
                <Button disabled type='primary' style={{
                    margin: '10px',
                }}>Run Test Online</Button>
            </Tooltip>}


            <Button type="primary" icon={<DownloadOutlined />}
                onClick={downloadCaseBtnClick}>
                Download Cases
            </Button>

            <Tooltip title="Download Contract files for Contracting Testing based on PACT">
                <Button type="primary" icon={<DownloadOutlined />}
                    style={{ marginLeft: '10px' }}
                    onClick={downloadPactBtnClick}>
                    Download Contracts
                </Button>
            </Tooltip>

            {
                success_cases_output.length != 0 || error_cases_output.length != 0 || border_cases_output.length != 0 ?
                    <Card
                        title="Output"
                        style={{
                            width: '100%',

                        }}
                        tabList={tabListNoTitle}
                        activeTabKey={activeOutputTabKey}
                        onTabChange={(key) => setActiveOutputTabKey(key)}
                        tabProps={{
                            size: 'middle',
                        }}
                    >
                        {contentListNoTitle[activeOutputTabKey]}
                    </Card> : null}
        </>
    )

}


export default MyProgressCard