const request = require('supertest');
const {
    insertRecord,
    getRecord,
    updateRecord,
    deleteRecord,
    getRecordsList
} = require('./database');

describe('Database Operations', () => {
    const testTable = 'testTable';
    const testData = { key: 'testKey', api_name: 'testApi', value: 'testValue' };

    it('should insert a record', async () => {
        await expect(insertRecord(testTable, testData)).resolves.toBeUndefined();
    });

    it('should retrieve an inserted record', async () => {
        await expect(getRecord(testTable, testData.key)).resolves.toEqual(testData);
    });

    it('should reject when trying to insert a duplicate record', async () => {
        await expect(insertRecord(testTable, testData)).rejects.toEqual('duplicate key');
    });

    it('should update an existing record', async () => {
        const updatedData = { ...testData, value: 'newValue' };
        await expect(updateRecord(testTable, testData.key, updatedData)).resolves.toBeUndefined();
        await expect(getRecord(testTable, testData.key)).resolves.toEqual(updatedData);
    });

    it('should delete an existing record', async () => {
        await expect(deleteRecord(testTable, testData.key)).resolves.toBeUndefined();
        await expect(getRecord(testTable, testData.key)).rejects.toEqual('record not found');
    });

    it('should get records list', async () => {
        await insertRecord(testTable, { key: 'key1', api_name: 'api1', value: 'value1' });
        await insertRecord(testTable, { key: 'key2', api_name: 'api2', value: 'value2' });
        await expect(getRecordsList(testTable, 0, 2)).resolves.toHaveLength(2);
    });
});
