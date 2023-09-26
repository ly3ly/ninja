from flask import Flask

app = Flask(__name__)
app.config["JSON_AS_ASCII"] = False  # jsonify chinese characters

# alive test function
@app.route('/alive')
def iamalive():
    return 'Ninja is alive!'

from service import interface_create_service,interface_retrive_service,interface_delete_service,interface_modfiy_service,testcase_generate_service,testcase_excute_service