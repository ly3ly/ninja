
var database = {}


const getRecord = (table, key) => {
    return new Promise((resolve, reject) => {
        let records = database[table]
        if (records) {
            let isFind = false;
            for (let record of records) {
                if (record.key === key) {
                    isFind = true;
                    resolve(record)
                }
            }
            if (!isFind) {
                reject('record not found')
            }
        } else {
            reject('record not found')
        }
    })
}

const insertRecord = (table, data) => {
    return new Promise((resolve, reject) => {
        try {
            if (!database[table]) {
                database[table] = []
            }
            let isFind = false;
            for (let record of database[table]) {
                if (record.key === data.key || record.api_name === data.api_name) {
                    isFind = true;
                    reject('duplicate key')
                }
            }
            if (!isFind) {
                database[table].push(data)
                resolve()
            }

        } catch (error) {
            reject(error)
        }
    })
}

const updateRecord = (table, key, data) => {
    return new Promise((resolve, reject) => {
        let records = database[table]
        if (records) {
            let isFind = false;
            for (let i = 0; i < records.length; i++) {
                if (records[i].key === key) {
                    isFind = true;
                    database[table][i] = data
                    resolve()
                }
            }
            if (!isFind) {
                reject('record not found')
            }
        } else {
            reject('record not found')
        }
    })

}

const deleteRecord = (table, key) => {
    return new Promise((resolve, reject) => {
        let records = database[table]
        if (records) {
            let isFind = false;
            for (let i = 0; i < records.length; i++) {
                if (records[i].key === key) {
                    isFind = true;
                    database[table].splice(i, 1);
                    resolve()
                }
            }
            if (!isFind) {
                reject('record not found')
            }
        } else {
            reject('record not found')
        }
    })
}

const getRecordsList = (table, startIndex, pageSize) => {
    return new Promise(async (resolve, reject) => {
        let records = database[table] || [];
        if (records.length == 0) {
            resolve([])
        }
        if (startIndex == 0 && pageSize == 0) {
            resolve(records)
        }

        let dataBlock = (startIndex + 1) * pageSize
        if (dataBlock > records.length || records.length - startIndex < dataBlock) {
            dataBlock = records.length
        }
        let res = records.slice(startIndex, dataBlock);
        resolve(res)

    })
}

module.exports = {
    insertRecord,
    getRecord,
    updateRecord,
    deleteRecord,
    getRecordsList
}