
const { v4: uuidv4 } = require('uuid');
const { generateRandomNumbersInRange,
    generateRandomNumbersOutRange,
    generateRandomStringInRange,
    generateRandomStringsOutRange,
    generateRandomString,
} = require('../../utils/random');
const { writeFile } = require('../../utils/file');
const { runCmd } = require('../../utils/cmdtool');
const { getRecord } = require('../../store/database');
const { Response } = require('../../utils/response');
const INIT_NUMBER = 10

const apiParamWrapper = (params, depth = 0, father = null) => {
    let objArr = []
    try {
        for (const param of params) {
            //console.log(param)
            switch (param.para_type) {
                case "number":
                    // ////console.log(param.number_para_constrain)
                    const { min, max } = param.number_para_constrain
                    // normal mutation
                    const normalNumbers = generateRandomNumbersInRange(min, max, INIT_NUMBER);
                    // error mutation
                    const errorNumbers = generateRandomNumbersOutRange(min, max, INIT_NUMBER);
                    // border mutation
                    const borderNumbers = [min, max].sort((a, b) => a - b);
                    param.uuid = param.uuid || uuidv4();
                    let obj = {
                        uuid: param.uuid,
                        depth,
                        father: father,
                        param_name: param.para_name,
                        param_type: param.para_type,
                        normal: normalNumbers,
                        error: errorNumbers,
                        border: borderNumbers
                    }
                    objArr.push(obj)

                    break;
                case "string":
                    // ////console.log(param.string_para_opt_constrain)
                    // ////console.log(param.string_para_length_constrain)
                    param.uuid = param.uuid || uuidv4();
                    let defaultChoice = (!param.string_para_opt_constrain && !param.string_para_length_constrain)
                    // ////console.log(param.para_name, defaultChoice, param.string_para_opt_constrain, param.string_para_length_constrain)
                    if (defaultChoice || param.string_para_length_constrain) {
                        const { min, max } = param.string_para_length_constrain || { min: 0, max: INIT_NUMBER }
                        // //console.log(param.para_name, '-generateRandomStringInRange-', min, max, INIT_NUMBER)
                        const normalStrings = generateRandomStringInRange(min, max, INIT_NUMBER);
                        const errorStrings = generateRandomStringsOutRange(min, max, INIT_NUMBER);
                        const borderStrings = [generateRandomString(min), generateRandomString(max)].sort((a, b) => a - b);
                        let obj = {
                            uuid: param.uuid,
                            depth,
                            father: father,
                            param_name: param.para_name,
                            param_type: param.para_type,
                            normal: normalStrings,
                            error: errorStrings,
                            border: borderStrings
                        }
                        objArr.push(obj)
                    } else if (param.string_para_opt_constrain) {
                        //console.log('param.string_para_opt_constrain', param.string_para_opt_constrain)
                        const normalStrings = param.string_para_opt_constrain;
                        const errorStrings = param.string_para_opt_constrain.map((str) => str + "-error");
                        const borderStrings = normalStrings
                        let obj = {
                            uuid: param.uuid,
                            depth,
                            father: father,
                            param_name: param.para_name,
                            param_type: param.para_type,
                            normal: normalStrings,
                            error: errorStrings,
                            border: borderStrings
                        }
                        objArr.push(obj)
                    }
                    break;
                case "object":
                    // param.uuid = param.uuid || uuidv4();
                    //递归
                    let item = apiParamWrapper(param.object_para_constrain, depth + 1, param);
                    objArr.push(...item);
                    break;
                default:
                    //console.log("param type error", param);
                    break;
            }
        }
    } catch (error) {
        //console.log(error)
    }

    return objArr

}

const pictMutation = async (paramList, mutationType) => {
    let testcases = []

    let filedata = "";
    for (let i = 0; i < paramList.length; i++) {
        const uuid = paramList[i].uuid;
        filedata += `${uuid}:`
        for (let j = 0; j < paramList[i][mutationType].length; j++) {
            filedata += `${paramList[i][mutationType][j]},`
        }
        filedata = filedata.slice(0, -1) + "\n";
    }


    try {
        await writeFile("tmp.txt", filedata);
        let output = await runCmd("./pict", "./tmp.txt");
        // ////console.log(`cmd output: \n${output}`);
        //根据output 恢复参数
        let lines = output.split("\n");
        if (lines.length < 2) {
            return;
        }
        let uuids = lines[0].split("\t");
        ////console.log(uuids)

        for (let i = 1; i < lines.length; i++) {
            let data = lines[i].split("\t");
            ////console.log(data)
            let obj = {}
            for (let k = 0; k < uuids.length; k++) {
                obj[uuids[k]] = data[k]
            }
            testcases.push(obj)
        }
    } catch (error) {
        //console.log(error)
    } finally {
        return testcases
    }

}

const restoreBody = (list, paramsTree) => {
    let caseList = []
    for (let i = 0; i < list.length; i++) {
        const caseItem = list[i];
        let rntItem = {}
        for (let key in caseItem) {
            let val = caseItem[key]
            // //console.log('current param for restoring->', key, val)
            for (let param of paramsTree) {
                let currentDepth = 0
                if (param.uuid === key && currentDepth == param.depth) {
                    // //console.log(`${key} is for ${param.param_name}`)
                    rntItem[param.param_name] = param.param_type == "number" ? Number(val) : val;
                    break;
                }
                while (currentDepth < param.depth) {
                    currentDepth++

                    let father = param.father
                    let tmpItem = rntItem[father.para_name] || {}
                    for (let item of father.object_para_constrain) {
                        if (currentDepth == param.depth && item.uuid == key) {
                            tmpItem[item.para_name] = param.param_type == "number" ? Number(val) : val;

                        }
                    }

                    rntItem[father.para_name] = tmpItem
                }
            }
        }
        caseList.push(rntItem)
    }

    return caseList


}

const restoreFullRequest = (BodyList, resCodeName, resCode) => {
    let rntList = []
    for (let i = 0; i < BodyList.length; i++) {
        const caseItem = BodyList[i];
        rntList.push({
            "request": caseItem,
            "response": {
                [resCodeName]: resCode
            }
        })
    }
    return rntList
}

const generateTestCases = async (params) => {
    let request = params.api_body
    let response = params.api_response
    // //console.log('req,res->', request, response)
    //console.log(555)
    let apiParamWrapperRes = apiParamWrapper(request)
    //console.log(666)
    let normalCases = await pictMutation(apiParamWrapperRes, "normal")
    let errorCases = await pictMutation(apiParamWrapperRes, "error")
    let borderCases = await pictMutation(apiParamWrapperRes, "border")
    //console.log(999)
    let restoreNormalCasesRes = restoreBody(normalCases, apiParamWrapperRes)
    let restoreErrorCasesRes = restoreBody(errorCases, apiParamWrapperRes)
    let restoreBorderCasesRes = restoreBody(borderCases, apiParamWrapperRes)
    //console.log(888)
    let normalCasesFull = restoreFullRequest(restoreNormalCasesRes, response.code_name, response.success_code)
    let errorCasesFull = restoreFullRequest(restoreErrorCasesRes, response.code_name, response.fail_code)
    let borderCasesFull = restoreFullRequest(restoreBorderCasesRes, response.code_name, response.success_code)
    //console.log(777)
    return {
        "success_cases": normalCasesFull,
        "error_cases": errorCasesFull,
        "border_cases": borderCasesFull
    }
}

const handleGenerateTestcase = async (id) => {
    //console.log('id-->', id)
    try {
        let record = await getRecord('interface', id);
        // //console.log(record)
        let testcases = await generateTestCases(record);
        //console.log('testcases--->', testcases)
        let success_cases = testcases.success_cases;
        let error_cases = testcases.error_cases;
        let border_cases = testcases.border_cases;
        if (success_cases.length == error_cases.length && success_cases.length == border_cases.length && success_cases.length == 0) {
            return res.json(Response(51000, testcases, `0 case generated, something error with server`));
        }
        return Response(0, testcases, 'success');
    } catch (error) {
        return Response(51001, error, 'fail');
    }
}

const handleRunTestcase = async (params) => {
    let id = params.id
    try {
        //generate
        genRes = await handleGenerateTestcase(id);
        if (genRes.code != 0) {
            return Response(51002, genRes.msg, 'fail');
        }
        testcases = genRes.data;
        //run testcases
        return Response(0, testcases, 'run success');

    } catch (error) {
        return Response(51003, error, 'fail');
    }


}

module.exports = {
    handleGenerateTestcase,
    handleRunTestcase
}