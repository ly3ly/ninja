from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
app.config["JSON_AS_ASCII"] = False  # jsonify chinese characters
# CORS(app)  # 启用 CORS 支持
CORS(app, resources={r"/api/*": {"origins": "http://127.0.0.1:5173"}}, supports_credentials=True)

# alive test function
@app.route('/alive')
def iamalive():
    return 'Ninja is alive!'

from service import interface_create_service,interface_retrive_service,interface_delete_service,interface_modfiy_service,testcase_generate_service,testcase_excute_service