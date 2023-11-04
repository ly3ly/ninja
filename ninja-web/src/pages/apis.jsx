/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import { useState, useEffect } from "react";
import {
    Card, Button, Form, Input, Table, Space, Modal, Tag, Popconfirm, Select, Checkbox,
    Popover, InputNumber, Row, Col, message, Typography
} from "antd";
const { Title, Paragraph, Text, Link } = Typography;
import { PlusOutlined, CloseOutlined, MinusCircleOutlined, FileAddOutlined, FormOutlined } from "@ant-design/icons";
import { DeleteApi, GetApiList, PostNewApi, UpdateApi } from "../services/interface";
const { Option } = Select;
import { saveAs } from 'file-saver';
var dataSource = [
    {
        "key": '1',
        "api_name": "update user information",
        "api_url": "https://www.testprj.com/api/user",
        "api_method": "PUT",
    },
    {
        "key": '2',
        "api_name": "test api",
        "api_url": "https://www.testprj.com/api/test",
        "api_method": "POST",
    },
    {
        "key": '3',
        "api_name": "test api",
        "api_url": "https://www.testprj.com/api/test",
        "api_method": "POST",
    },
    {
        "key": '4',
        "api_name": "test api",
        "api_url": "https://www.testprj.com/api/test",
        "api_method": "POST",
    },

]

var apiBodyDefaultVal = `[
    {
        "para_name": "userid",
        "para_type": "number",
        "number_para_constrain": {
            "min": -1,
            "max": 100
        }
    },
    {
        "para_name": "username",
        "para_type": "string"
    },
    {
        "para_name": "user_language",
        "para_type": "string",
        "string_para_opt_constrain": ["zh-cn", "zh-hk", "zh-tw"]
    },
    {
        "para_name": "user_detail",
        "para_type": "object",
        "object_para_constrain": [
            {
                "para_name": "user_gender",
                "para_type": "string",
                "string_para_opt_constrain": [
                    "male",
                    "female",
                    "other"
                ]
            },
            {
                "para_name": "user_age",
                "para_type": "number",
                "number_para_constrain": {
                    "min": 18,
                    "max": 120
                }
            }
        ]
    }
]`

import { serverUrl } from "../services/tools";
import GenTestcase from "../components/progress/GenTestcase";
import TextArea from "antd/lib/input/TextArea";
import { convertJsonToYaml, convertYamlToJson, isValidJsonOrYaml } from "../../utils/json2yaml";

const ApiPage = () => {
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState('New API');
    const [tableData, setTableData] = useState(dataSource);
    const [modalForm, setModalForm] = useState();
    const [testAPI, setTestAPI] = useState("");
    const [showGenTestcase, setShowGenTestcase] = useState(false);

    useEffect(() => {
        GetApiList({ start_index: 0, page_size: 10 }).then(res => {
            console.log(res)
            if (res.code === 0) {
                setTableData(res.data)
            } else {
                message.error(res.data);
            }
        })
    }, [])



    const tableCols = [
        {
            title: 'API Name',
            dataIndex: 'api_name',
            width: 180,
        },
        {
            title: 'API URL',
            dataIndex: 'api_url',
            width: 180,
        },
        {
            title: 'API Method',
            dataIndex: 'api_method',
            width: 180,
            render: (tag) => {
                return (
                    <Tag>{tag}</Tag>
                )
            },
        },
        {
            title: 'Action',
            dataIndex: 'name',
            width: 180,
            render: (_, record) => (
                < Space size="middle" >

                    <a
                        onClick={() => {
                            console.log('click', record)
                            // window.open(`${serverUrl}/interface/run/${record.key}`)
                            setTestAPI(record)
                            setShowGenTestcase(true)
                        }}>Run</a>

                    <a
                        onClick={() => {
                            setOpen(true)
                            setModalTitle(`API: ${record.api_name}`)
                            setModalForm(record)
                        }}
                    >Detail</a>

                    <Popconfirm
                        title="Delete API"
                        description="Are you sure to delete this API?"
                        onConfirm={() => {
                            console.log(record)
                            DeleteApi(record.key).then(res => {
                                console.log('del res', res)
                                if (res.code == 0) {
                                    let data = tableData.filter(item => item.key !== record.key);
                                    setTableData(data)
                                }
                            }).catch(err => {
                                console.log('err', err)

                            })

                        }}
                        okText="Yes"
                        cancelText="No"
                    >
                        <a>Delete</a>
                    </Popconfirm>

                    <Popover
                        content={<><a
                            onClick={() => {
                                const fileName = `${record.api_name}.json`;
                                let filedata = record
                                const blob = new Blob([JSON.stringify(filedata)], { type: 'text/plain;charset=utf-8' });
                                saveAs(blob, fileName);
                                // console.log("json")
                            }}>JSON</a> <a
                                onClick={() => {
                                    console.log("yaml")
                                    const fileName = `${record.api_name}.yaml`;
                                    let filedata = convertJsonToYaml(record)
                                    const blob = new Blob([filedata], { type: 'text/plain;charset=utf-8' });
                                    saveAs(blob, fileName);
                                }}
                            >YAML</a></>}
                        title="Select Format"
                        trigger="click"
                    >
                        <a>Download</a>
                    </Popover >



                </Space >
            ),
        }
    ]
    const [showImportFromJSONYAML, setShowImportFromJSONYAML] = useState(false)
    const ImportFromJSONYAML = () => {
        const [verifyResult, setVerifyResult] = useState("Wait to verify")
        const [reqData, setReqData] = useState({})
        return (
            <Modal
                open={showImportFromJSONYAML}
                onCancel={() => setShowImportFromJSONYAML(false)}
                title="Import From JSON/YAML"
                onOk={() => {
                    PostNewApi(reqData).then(res => {
                        console.log(res)
                        if (res.code == 0) {
                            GetApiList({ start_index: 0, page_size: 1000 }).then(res => {
                                console.log(res)
                                if (res.code === 0) {
                                    setOpen(false);
                                    message.success('create successfully!');
                                    setTableData(res.data)
                                } else {
                                    message.error(res.data);
                                }
                            })
                        } else {
                            message.error(res.data);
                        }

                    }).catch(err => {
                        console.log(err)
                    }).finally(() => {
                        setLoading(false);
                        // setShowImportFromJSONYAML(false)
                        // setModalForm();
                    })
                }}
            >
                <TextArea placeholder="Paste your context here"
                    onChange={(val) => {
                        let res = isValidJsonOrYaml(val.target.value);
                        if (!res) {
                            setVerifyResult("Invalid JSON/YAML")
                        } else {
                            let data = val.target.value
                            setVerifyResult(`context type: ${res}`)
                            if (res == 'yaml') {
                                data = convertYamlToJson(res)
                            }
                            setReqData(data);
                        }
                        // console.log(res)
                    }}
                    style={{ marginBottom: '10px' }}
                    autoSize={{
                        minRows: 10,
                        maxRows: 20,
                    }}></TextArea>
                <Text keyboard >{verifyResult}</Text>

            </Modal>
        )
    }
    const [showMyInsertOpts, setShowMyInsertOpts] = useState(false)
    const MyInsertOpts = () => {

        return (
            <Modal
                onCancel={() => { setShowMyInsertOpts(false) }}
                title="Insert Options"
                open={showMyInsertOpts}
                footer={null}>
                <Button
                    type="dashed"
                    onClick={() => {
                        setShowMyInsertOpts(false)
                        setShowImportFromJSONYAML(true)
                    }}
                >
                    <FileAddOutlined />
                    Import from JSON/YAML
                </Button>
                <Button
                    type="dashed"
                    style={{ marginLeft: '10px' }}
                    onClick={() => {
                        setShowMyInsertOpts(false)
                        setOpen(true)
                        setModalTitle('New API')
                        setModalForm()
                    }}
                >
                    <FormOutlined />
                    Manually import
                </Button>
            </Modal>
        )
    }
    const MyModal = () => {
        // console.log('modal props:', modalForm)

        const [form] = Form.useForm();

        form.setFieldsValue({
            "api_name": modalForm?.api_name,
            "api_method": modalForm?.api_method,
            "api_url": modalForm?.api_url,
            "api_body": JSON.stringify(modalForm?.api_body),
            "code_name": modalForm?.api_response?.code_name,
            "success_code": modalForm?.api_response?.success_code,
            "fail_code": modalForm?.api_response?.fail_code,
            "url_reachable": modalForm?.url_reachable
        })

        const handleOk = () => {
            const formdata = form.getFieldsValue();
            let { api_body, api_name, api_url, api_method, url_reachable, code_name, success_code, fail_code } = formdata;
            // form.submit();
            const reqData = {
                api_name: api_name || 'update user information',
                api_url: api_url || 'https://www.testprj.com/api/user',
                api_method: api_method || 'PUT',
                api_body: api_body ? JSON.parse(api_body) : [],
                api_response: {
                    code_name: code_name || 'code',
                    success_code: success_code || '0',
                    fail_code: fail_code || '999'
                },
                url_reachable: url_reachable || false
            }
            setLoading(true);
            if (modalTitle == "New API") {
                PostNewApi(reqData).then(res => {
                    console.log(res)
                    if (res.code == 0) {
                        GetApiList({ start_index: 0, page_size: 1000 }).then(res => {
                            console.log(res)
                            if (res.code === 0) {
                                setOpen(false);
                                message.success('create successfully!');
                                setTableData(res.data)
                            } else {
                                message.error(res.data);
                            }
                        })
                    } else {
                        message.error(res.data);
                    }

                }).catch(err => {
                    console.log(err)
                }).finally(() => {
                    setLoading(false);
                    setModalForm();
                })
            } else {
                UpdateApi({ ...reqData, key: modalForm.key }).then(res => {
                    console.log(res)
                    if (res.code == 0) {
                        GetApiList({ start_index: 0, page_size: 1000 }).then(res => {
                            console.log(res)
                            if (res.code === 0) {
                                setOpen(false);
                                message.success('update successfully!');
                                setTableData(res.data)
                            } else {
                                message.error(res.data);
                            }
                        })
                    } else {
                        message.error(res.data);
                    }
                }).finally(() => {
                    setLoading(false);
                    setModalForm();
                })
            }


        };

        return (
            <Modal
                width='75vw'
                open={open}
                title={modalTitle}
                maskClosable={false}
                onCancel={() => { setOpen(false) }}
                footer={[
                    <Button key="back" onClick={() => { setOpen(false) }}>
                        Cancel
                    </Button>,
                    <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
                        {modalTitle == "New API" ? 'Create' : 'Update'}
                    </Button>
                ]}
            >
                <Form form={form}
                >
                    <Form.Item
                        name="api_name"
                        label="Name"
                        rules={[
                            {
                                required: true,
                            }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Row>
                        <Col span={3}>
                            <Form.Item
                                name="api_method"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please select one Method',
                                    },
                                ]}
                            >
                                <Select
                                    placeholder="Method"
                                >
                                    <Option value="GET">GET</Option>
                                    <Option value="POST">POST</Option>
                                    <Option value="PUT">PUT</Option>
                                    <Option value="DELETE">DELETE</Option>

                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={20} offset={1}>
                            <Form.Item
                                name="api_url"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your URL',
                                    },
                                    {
                                        type: 'url',
                                        message: 'URL is not valid',
                                        warningOnly: true,
                                    }
                                ]}
                            >
                                <Input placeholder="URL" />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Card title="Request Body">
                        <Form.Item name="api_body" initialValue={apiBodyDefaultVal}>
                            <Input.TextArea placeholder={apiBodyDefaultVal} autoSize allowClear style={{ maxHeight: '300px', overflow: 'auto' }} />
                        </Form.Item>




                        {/* <Form.List name="api_body">
                        {(fields, { add, remove }) => (
                            <>
                                {fields.map(({ key, name, ...restField }) => (
                                    <Space
                                        key={key}
                                        style={{
                                            display: 'flex',
                                            marginBottom: 8,
                                        }}
                                        align="baseline"
                                    >
                                        <Form.Item
                                            {...restField}
                                            label="Name"
                                            name={[name, 'para_name']}
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Missing param name',
                                                },
                                            ]}
                                        >
                                            <Input placeholder="Param name" />
                                        </Form.Item>
                                        <Form.Item
                                            {...restField}
                                            label="Type"
                                            name={[name, 'para_type']}
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Missing Param type',
                                                },
                                            ]}
                                            style={{ width: '150px' }}
                                        >
                                            <Select
                                                placeholder="Parameter Type"
                                            >
                                                <Option value="number">number</Option>
                                                <Option value="string">string</Option>
                                                <Option value="object">object</Option>

                                            </Select>
                                        </Form.Item>
                                        <Popover content="min lenth for string, min value for number">
                                            <Form.Item
                                                {...restField}
                                                label="min"
                                                name={[name, 'para_min']}
                                                style={{ width: '150px' }}
                                            >
                                                <Input
                                                />
                                            </Form.Item>
                                        </Popover>
                                        <Popover content="min lenth for string, min value for number">
                                            <Form.Item
                                                {...restField}
                                                label="max"
                                                name={[name, 'para_max']}
                                                style={{ width: '150px' }}
                                            >
                                                <Input
                                                />
                                            </Form.Item>
                                        </Popover>


                                        <Form.Item
                                            noStyle
                                            shouldUpdate={(prevValues, currentValues) => prevValues.para_type !== currentValues.para_type}
                                        >
                                            {({ getFieldValue }) => {
                                                getFieldValue(['api_body', 'para_type']) == 'string' ? (
                                                    <Form.Item name="string_para_constrain" label="string_para_constrain" rules={[{ required: true }]}>
                                                        <Input />
                                                    </Form.Item>
                                                ) : getFieldValue(['api_body', 'para_type']) === 'numbner' ? (
                                                    <Form.Item name="number_para_constrain" label="number_para_constrain" rules={[{ required: true }]}>
                                                        <Input />
                                                    </Form.Item>
                                                ) : null
                                            }}


                                        </Form.Item>

                                        <MinusCircleOutlined onClick={() => remove(name)} />
                                    </Space>
                                ))}

                                <Form.Item>
                                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                        Add field
                                    </Button>
                                </Form.Item>
                            </>
                        )}
                    </Form.List> */}

                    </Card>
                    <Card title="Response">

                        <Form.Item

                        >
                            <Form.Item
                                name="code_name"
                                label="Code name"
                                required
                                labelCol={{ flex: '110px' }}
                                labelWrap

                            >
                                <Input style={{ width: '200px' }} />
                            </Form.Item>
                            <Form.Item
                                name="success_code"
                                label="Success code"
                                required
                                labelCol={{ flex: '110px' }}
                                labelWrap
                            >
                                <InputNumber style={{ width: '200px' }} />
                            </Form.Item>
                            <Form.Item
                                name="fail_code"
                                label="Fail code"
                                required
                                labelCol={{ flex: '110px' }}
                                labelWrap

                            >
                                <InputNumber style={{ width: '200px' }} />
                            </Form.Item>
                        </Form.Item>
                    </Card>

                    <Popover content="If the URL is reachable, then this API is integrable. Testcases of this API can be directly executed on this platform." title="Intergratibility">
                        <Form.Item
                            name="url_reachable"
                            valuePropName="checked"
                            initialValue={false}
                        >
                            <Checkbox>Integrable</Checkbox>
                        </Form.Item>
                    </Popover>

                </Form>
            </Modal >
        )

    }

    return (
        <>
            <GenTestcase show={showGenTestcase} testAPI={testAPI} onExit={() => {
                setShowGenTestcase(false)
                setTestAPI({})
            }} />
            <ImportFromJSONYAML />
            <MyInsertOpts />

            <MyModal />

            <Card
                title="API List"
                extra={
                    <Button type="primary" icon={<PlusOutlined />}
                        onClick={() => {
                            setShowMyInsertOpts(true)
                            // setOpen(true)
                            // setModalTitle('New API')
                            // setModalForm()
                        }}>
                        New API
                    </Button>
                }
            >
                <Space direction="vertical" style={{ width: '100%' }}>
                    <Table

                        columns={tableCols}
                        dataSource={tableData}
                    >

                    </Table>
                </Space>
            </Card>
        </>
    )
}
export default ApiPage