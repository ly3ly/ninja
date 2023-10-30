/* eslint-disable react/prop-types */
import { Row, Col, Progress, Tooltip } from "antd"
import { useEffect, useState, useRef } from "react"
import { httpMethods } from '../../services/post';

const requestTask = async (task, info) => {
    return new Promise((resolve, reject) => {
        let handler = function () { }
        if (httpMethods.has(info.api_method)) {
            handler = httpMethods.get(info.api_method);
        } else {
            console.log('Invalid HTTP method', info.api_method);
        }
        handler(info.api_url, task.request).then(res => {
            if (res.code != task.response.code) {
                // console.log('requestTask', task.response, res)
            }
            resolve({
                status: task.response.code == res.code,
                data: res
            })
        }).catch(err => {
            // console.log('requestTask err', err)
            reject({
                status: false,
                data: err
            })
        });

    })
};

const ProgressItem = (props) => {
    const { task_name, tasks, onFinish, onStart, onUpdate, info } = props
    const total_task = tasks.length
    const [runned_task, setRunnedTask] = useState(0);
    const [success_task, setSuccessTask] = useState(0);
    const [percent, setPercent] = useState(0);
    const [success_percent, setSuccessPercent] = useState(0);
    const [tool_title, setToolTitle] = useState('')
    const isFirstRender = useRef(true); // useRef 创建一个标志变量

    useEffect(() => {
        setPercent(0);
        setSuccessPercent(0);
    }, [tasks])

    useEffect(() => {
        if (runned_task >= 0) {
            setPercent(runned_task / total_task * 100);
            setToolTitle(`${success_task} success / ${runned_task - success_task} fail `);
        }
        if (success_task > 0) {
            setSuccessPercent(success_task / runned_task * 100);
        }
    }, [success_task, runned_task, total_task]);

    const DoRunTasks = async () => {
        let report = {
            total: total_task,
            success: 0,
            fail: 0,
            failData: [],
        }
        for (let i = 0; i < tasks.length; i++) {
            const task = tasks[i];
            let res = await requestTask(task, info);
            // console.log('res', res)
            if (res.status) {
                setSuccessTask(prev => prev + 1);
            } else {
                report.fail++
                report.failData.push({ case: task, response: res.data })
            }
            setRunnedTask(prev => prev + 1);
            onUpdate({
                key: i,
                success: res.status,
                data: { case: task, response: res.data }
            });
        }
        report.success = report.total - report.fail
        onFinish(report)

    }

    useEffect(() => {
        if (isFirstRender.current) {
            // 首次渲染时不执行逻辑
            isFirstRender.current = false;
            return;
        }

        setRunnedTask(() => 0);
        setSuccessTask(() => 0);
        DoRunTasks();
    }, [onStart])

    return (
        <Row>
            <Col flex="150px">
                {task_name}: {total_task}
            </Col>
            <Col flex="auto">
                <Tooltip title={tool_title}>
                    <Progress
                        percent={percent}
                        success={{
                            percent: success_percent,
                        }} showInfo={false} />
                </Tooltip>
            </Col>
            <Col flex="80px" style={{ textAlign: 'right' }}>
                {success_task} / {runned_task}
            </Col>

        </Row>
    )
}

export default ProgressItem