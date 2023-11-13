/* eslint-disable react/prop-types */
import { CloseOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input, Space, Select } from 'antd';
import { useEffect, useState } from 'react';

const ApiBodyList = (props) => {
    const { fatherForm } = props
    useEffect(() => {
        console.log('current father is: ', fatherForm)
    })

    const paraTypeChange = (value, filed) => {
        // console.log('change---->', filed, value)

    }

    return (
        <>
            <Form.List name={fatherForm}>
                {(fields, { add, remove }) => (
                    <div
                        style={{
                            display: 'flex',
                            rowGap: 16,
                            flexDirection: 'column',
                        }}
                    >
                        {fields.map((field) => {

                            return (
                                <Card
                                    size="small"
                                    title={`Param ${field.name + 1}`}
                                    key={field.key}
                                    extra={
                                        <CloseOutlined
                                            onClick={() => {
                                                remove(field.name);
                                            }}
                                        />
                                    }
                                >
                                    <Form.Item label="name" name={[field.name, 'para_name']}>
                                        <Input />
                                    </Form.Item>

                                    <Form.Item
                                        label="type"
                                        name={[field.name, 'para_type']}
                                    >
                                        <Select
                                            style={{
                                                width: 120,
                                            }}
                                            allowClear
                                            onChange={(value) => {
                                                paraTypeChange(value, field)
                                            }}
                                            options={[
                                                {
                                                    value: 'number',
                                                    label: 'number',
                                                },
                                                {
                                                    value: 'string',
                                                    label: 'string',
                                                },
                                                {
                                                    value: 'object',
                                                    label: 'object',
                                                },
                                            ]}
                                        />
                                    </Form.Item>


                                    <Form.Item
                                        noStyle
                                        // dependencies={[[field.name, 'para_type']]}
                                        shouldUpdate={(prevValues, curValues) => prevValues[fatherForm] == undefined || prevValues[fatherForm][field.name]?.para_type != curValues[fatherForm][field.name]?.para_type}
                                    >
                                        {
                                            ({ getFieldValue }) => {
                                                // console.log('father-val:', (fatherForm), getFieldValue(fatherForm))
                                                let fieldName = getFieldValue(fatherForm)?.[field.name]?.para_name || 'unknown'
                                                let fieldType = getFieldValue(fatherForm)?.[field.name]?.para_type || 'unknown'
                                                // console.log('field', fieldName, fieldType)

                                                if (fieldType == 'number') {
                                                    return (
                                                        <Space.Compact>
                                                            <Form.Item
                                                                name={[field.name, 'number_para_constrain', 'min']}
                                                                rules={[
                                                                    {
                                                                        required: true,
                                                                    },
                                                                ]}
                                                            >
                                                                <Input placeholder='min' />
                                                            </Form.Item>

                                                            <Form.Item
                                                                name={[field.name, 'number_para_constrain', 'max']}
                                                                rules={[
                                                                    {
                                                                        required: true,
                                                                    },
                                                                ]}
                                                            >
                                                                <Input placeholder='max' />
                                                            </Form.Item>
                                                        </Space.Compact>

                                                    )
                                                }
                                                if (fieldType == 'string') {
                                                    return (
                                                        <>
                                                            <Form.Item
                                                                label="constraint type"
                                                                name={[field.name, 'string_para_constrain']}
                                                                rules={[
                                                                    { required: true },
                                                                ]}
                                                            >
                                                                <Select
                                                                    style={{
                                                                        width: 120,
                                                                    }}
                                                                    allowClear
                                                                    options={[
                                                                        {
                                                                            value: 'string_para_length_constrain',
                                                                            label: 'length',
                                                                        },
                                                                        {
                                                                            value: 'string_para_opt_constrain',
                                                                            label: 'options',
                                                                        },

                                                                    ]}
                                                                />
                                                            </Form.Item>
                                                            <Form.Item noStyle
                                                                shouldUpdate={(prevValues, curValues) => prevValues[fatherForm][field.name].string_para_constrain !== curValues[fatherForm][field.name].string_para_constrain} >
                                                                {
                                                                    ({ getFieldValue }) => {
                                                                        let constraintType = getFieldValue(fatherForm)?.[field.name]?.string_para_constrain;
                                                                        if (constraintType == 'string_para_length_constrain') {
                                                                            return (
                                                                                // <Form.Item
                                                                                //     label="length"
                                                                                //     name={[field.name, "string_para_length_constrain"]}
                                                                                //     rules={[
                                                                                //         {
                                                                                //             required: true,
                                                                                //             message: 'Please input constraints!',
                                                                                //         },
                                                                                //     ]}
                                                                                // >
                                                                                //     <Input />
                                                                                // </Form.Item>
                                                                                <Space.Compact>
                                                                                    <Form.Item
                                                                                        name={[field.name, 'string_para_length_constrain', 'min']}
                                                                                        rules={[
                                                                                            {
                                                                                                required: true,
                                                                                            },
                                                                                        ]}
                                                                                    >
                                                                                        <Input placeholder='min' />
                                                                                    </Form.Item>

                                                                                    <Form.Item
                                                                                        name={[field.name, 'string_para_length_constrain', 'max']}
                                                                                        rules={[
                                                                                            {
                                                                                                required: true,
                                                                                            },
                                                                                        ]}
                                                                                    >
                                                                                        <Input placeholder='max' />
                                                                                    </Form.Item>
                                                                                </Space.Compact>
                                                                            )
                                                                        }
                                                                        if (constraintType == 'string_para_opt_constrain') {
                                                                            return (
                                                                                <Form.Item
                                                                                    label="options"
                                                                                    name={[field.name, "string_para_opt_constrain"]}
                                                                                    rules={[
                                                                                        {
                                                                                            required: true,
                                                                                            message: 'Please input constraints, divide by comma!',
                                                                                        },
                                                                                    ]}
                                                                                >
                                                                                    <Input />
                                                                                </Form.Item>
                                                                            )
                                                                        }
                                                                    }
                                                                }

                                                            </Form.Item>
                                                        </>
                                                    )
                                                }

                                                if (fieldType == 'object') {
                                                    return (<ApiBodyList fatherForm={fieldName} />)
                                                }
                                            }
                                        }
                                    </Form.Item>




                                </Card>
                            )
                        })}

                        <Button type="dashed" onClick={() => add()} block>
                            + Add Param
                        </Button>
                    </div>
                )}
            </Form.List>


        </>
    );
};
export default ApiBodyList;