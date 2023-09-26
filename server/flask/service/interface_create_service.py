# from model.model_interface import CreateInterfaceParams
from flask import request, jsonify
from serialize import common_response
from config import SUCCESS_CODE, FAIL_CODE
from service import app 

from model.database import *

# create a new API
@app.route('/api/interface', methods=['POST'])
def interface_create_service():
    params = request.json
    # valid the params
    # valid fail, return error
    is_valid = False
    if (is_valid):
        return common_response(FAIL_CODE, "invalid params", 'invalid params')

    # check DB: is this API already exists according to unique key
    # if exists, return error
    is_exist = False
    if (is_exist):
        return common_response(FAIL_CODE, "api id: ", 'API already exists')

    # insert into DB
    res,msg = insert_db('interfaceDB', params)
    if(res == False):
        return common_response(FAIL_CODE, msg, "insert db failed")
    
    return common_response(SUCCESS_CODE, msg, 'Interface created successfully')