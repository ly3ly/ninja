from service import app
from model.database import *
from serialize import common_response
from config import SUCCESS_CODE, FAIL_CODE
from flask import request, jsonify

# Read an exist API
@app.route('/api/interface/<api_id>', methods=['GET'])
def get_interface(api_id):
    # pass the parameters to the service
    code,msg = get_db('interfaceDB', api_id)
    if code != True:
        return common_response(FAIL_CODE, msg, 'get db failed')
    res = common_response(SUCCESS_CODE, msg, "success")
    return res


# Read exist API list
@app.route('/api/interfaces', methods=['POST'])
def get_interface_list():
    params = request.json
    # valid the params
    # valid fail, return error
    is_valid = False
    if (is_valid):
        return common_response(FAIL_CODE, "invalid params", 'invalid params')
    
    start_page = params['start_page']
    page_size = params['page_size']

    # check DB
    res,total = get_all_db('interfaceDB',start_page,page_size)
    data = {
        "total": total,
        "value": list(res)
    }
    return common_response(SUCCESS_CODE, (data), "success")