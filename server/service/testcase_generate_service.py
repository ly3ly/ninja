
from service import app
from model.database import *
from serialize import common_response
from config import SUCCESS_CODE, FAIL_CODE
from flask import request, jsonify

# generate testcases, this is the core function of our platform!
def testcase_generate():
    # retrieve the corresponding interface
    # generate testcases
    pass