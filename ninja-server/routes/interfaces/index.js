const express = require('express');
const { handleGenerateTestcase, handleRunTestcase } = require('./testcase');
const { handleNewInterface, handleGetInterfaceList, handleGetInterfaceById, handleDeleteInterface, handleUpdateInterface, handleGetInterfaceAll } = require('./interface');

var interfaceRouter = express.Router();

interfaceRouter.get('/ping', function (req, res) {
    res.send('interface router');
})

//post a new interface
interfaceRouter.post('/', async function (req, res) {
    // Handle the logic for creating a new interface
    const params = req.body;
    const createRes = await handleNewInterface(params)
    res.json(createRes);
})


//get interfaces list with startindex and pagesize
interfaceRouter.get('/', async function (req, res) {
    const startIndex = parseInt(req.query.start_index) || 0;
    const pageSize = parseInt(req.query.page_size) || 10;
    const listRes = await handleGetInterfaceList(startIndex, pageSize)
    res.json(listRes);
})

// get all interfaces
interfaceRouter.get('/', async function (req, res) {
    // Handle the logic for getting all interfaces
    const listRes = await handleGetInterfaceAll();
    res.json(listRes);
})

//get a specific interface
interfaceRouter.get('/:id', async function (req, res) {
    // Handle the logic for getting a specific interface
    const interfaceId = req.params.id;
    const recordRes = await handleGetInterfaceById(interfaceId);
    res.json(recordRes)
})

//delete a specific interface
interfaceRouter.delete('/:id', async function (req, res) {
    // Handle the logic for deleting a specific interface
    const interfaceId = req.params.id;
    const deleteRes = await handleDeleteInterface(interfaceId);
    res.json(deleteRes)
})

//update a specific interface
interfaceRouter.put('/', async function (req, res) {
    // Handle the logic for updating a specific interface
    const params = req.body;
    const updateRes = await handleUpdateInterface(params);
    res.json(updateRes);
})

//generate testcases for a specific interface
interfaceRouter.get('/gen/:id', async function (req, res) {
    const interfaceId = req.params.id;
    const generateTestcaseRes = await handleGenerateTestcase(interfaceId);
    res.json(generateTestcaseRes)
})

//run testcases
interfaceRouter.get('/run/:id', async function (req, res) {
    let params = {
        id: req.params.id
    }
    const generateTestcaseRes = await handleRunTestcase(params);
    res.json(generateTestcaseRes)
})

module.exports = interfaceRouter;
