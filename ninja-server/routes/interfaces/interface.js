const { v4: uuidv4 } = require('uuid');
const { insertRecord, getRecordsList, deleteRecord, updateRecord } = require('../../store/database');
const { Response } = require('../../utils/response');

const handleNewInterface = async (param) => {
    //todo validate
    param.key = uuidv4();

    try {
        let res = await insertRecord('interface', param)
        return Response(0, res || param, 'insert success');

    } catch (error) {
        return Response(50001, error || param, 'insert fail');
    }
}

const handleGetInterfaceList = async (startIndex, pageSize) => {
    try {
        // console.log(startIndex, pageSize)
        let res = await getRecordsList('interface', startIndex, pageSize);
        return Response(0, res, 'success');

    } catch (error) {
        return Response(50002, error, 'fail');
    }

}

const handleGetInterfaceAll = async () => {
    try {
        let res = await getRecordsList('interface', 0, 0);
        return Response(0, res || param, 'success');
    }
    catch (error) {
        return Response(50003, error || param, 'fail');
    }

}


const handleGetInterfaceById = async (key) => {
    try {
        let res = await getRecord('interface', key);
        return Response(0, res || param, 'success');

    } catch (error) {
        return Response(50004, error || param, 'fail');
    }
}

const handleDeleteInterface = async (param) => {
    let key = param || ""
    try {
        // console.log('del key:', key)
        let res = await deleteRecord('interface', key);
        return Response(0, res || param, 'success');
    } catch (error) {
        return Response(50005, error || param, 'fail');
    }
}
const handleUpdateInterface = async (param) => {
    try {
        let res = await updateRecord('interface', param?.key, param);
        return Response(0, res || param, 'success');
    } catch (error) {
        return Response(50006, error || param, 'fail');
    }

}



module.exports = {
    handleNewInterface,
    handleGetInterfaceList,
    handleGetInterfaceById,
    handleDeleteInterface,
    handleUpdateInterface,
    handleGetInterfaceAll
}