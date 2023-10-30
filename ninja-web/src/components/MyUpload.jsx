import { useState } from 'react';
import { InboxOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import GenTestcase from './progress/GenTestcase';
const { Dragger } = Upload;


const MyUpload = () => {

    const [testAPI, setTestAPI] = useState({})
    const [apiCase, setApiCase] = useState({})
    const [showGenTestcase, setShowGenTestcase] = useState(false);
    const onReadFile = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsText(file);
            reader.onload = () => {
                resolve(reader.result);
            };
            reader.onerror = (error) => {
                reject(error);
            };
        })
    }
    const props = {
        name: 'file',
        multiple: true,
        showUploadList: false,
        accept: '.json',
        // action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
        async customRequest(para) {
            const { file } = para
            const filedata = await onReadFile(file)
            // console.log(filedata)
            let fileJson = JSON.parse(filedata)
            console.log(fileJson)
            try {
                if (fileJson && fileJson.api_info && fileJson.testcases) {
                    setTestAPI(fileJson.api_info)
                    setApiCase(fileJson.testcases)
                    setShowGenTestcase(true)
                } else {
                    message.error('Error in validing file content!')
                }

            } catch (error) {
                message.error('Error in validing file content!')
            }

        },
        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
        },
    };


    return (
        <>
            {showGenTestcase ? <GenTestcase show={showGenTestcase} testAPI={testAPI}
                ApiCases={apiCase}
                onExit={() => {
                    setShowGenTestcase(false)
                    setTestAPI({})
                    setApiCase({})
                }} >
            </GenTestcase> : null}
            <Dragger {...props}>
                <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                </p>
                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                <p className="ant-upload-hint">
                    Support for a single or bulk upload. Strictly prohibited from uploading company data or other
                    banned files.
                </p>
            </Dragger>
        </>
    )
}
export default MyUpload;