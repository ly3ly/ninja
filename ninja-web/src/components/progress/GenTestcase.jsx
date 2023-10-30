/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import { useEffect, useState } from "react";
import { Modal, Card, Divider, Descriptions, Tag } from "antd";
import MyProgressCard from "./MyProgressCard";
import { RunApi } from "../../services/interface";

const testcase_template = {
    success_cases: [],
    error_cases: [],
    border_cases: []

}

const GenTestcase = (props) => {
    const { show, testAPI, onExit, ApiCases } = props
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [testcases, setTestcases] = useState(testcase_template)
    const [modalTitle, setModalTitle] = useState('Testcase')
    const [despinfo, setDespInfo] = useState([])
    // const [visitURL, setVisitURL] = useState('')

    useEffect(() => {
        return () => {
            console.log('GenTestcase clear data')
            setTestcases(testcase_template);
        }

    }, [])

    useEffect(() => {
        // setVisitURL({
        //     url: testAPI.api_url,
        //     method: testAPI.api_method
        // })
        setDespInfo([
            {
                key: 0,
                label: 'URL',
                children: testAPI.api_url
            },
            {
                key: 1,
                label: 'Method',
                children: <Tag>{testAPI.api_method}</Tag>
            },
            {
                key: 2,
                label: 'Integrable',
                children: <Tag color={testAPI.url_reachable ? '#87d068' : '#f50'}>{testAPI.url_reachable ? 'Yes' : 'No'}</Tag>
            }
        ])
        console.log('ApiId', testAPI.key)
        setModalTitle(`ID: ${testAPI.key}`)
        console.log('apicases', ApiCases)
        if (ApiCases) {
            setTestcases(ApiCases)
        } else {
            if (testAPI.key && show) {
                RunApi(testAPI.key).then(res => {
                    console.log(res)
                    if (res?.code == 0) {
                        setTestcases(res.data);
                    }
                })
            }
        }

        setIsModalOpen(show);
    }, [show, testAPI, ApiCases])

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
        setTestcases(testcase_template);
        onExit()
    };
    const handleCancel = () => {
        console.log('on exit')
        setTestcases(testcase_template);
        onExit()
        setIsModalOpen(false);
    };
    return (
        <Modal open={isModalOpen} title={modalTitle} onOk={handleOk} onCancel={handleCancel} width="80%" maskClosable={false}>
            <Card>
                <Descriptions title={testAPI.api_name} items={despinfo} />

            </Card>
            <Divider></Divider>
            <MyProgressCard testcases={testcases} info={testAPI} />
        </Modal>
    )
}

export default GenTestcase