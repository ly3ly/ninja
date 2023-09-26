
from model import DB as db
import hashlib

def insert_db(dbname , data):
     # generate key for this API
    keyraw = ("{}-{}-{}".format(data["api_url"], data["api_method"],data["api_name"])).replace(" ", "")
    key = hashlib.md5(keyraw.encode()).hexdigest()
    code,msg = get_db(dbname, key)
    if code == True:
        return False, "record already exists:" + str(msg) 
    db[dbname][key] = data
    print (key)
    return True, key

def modify_db(dbname , key,data):
    db[dbname][key] = data

def del_db(dbname, key):
    db[dbname].pop(key)

def get_db(dbname, key):
    return (True,db[dbname][key]) if key in db[dbname] else (False, "record not found")

def get_all_db(dbname,start_page_0,page_size):
    data = db[dbname].items()
    start_page = start_page_0 + 1
    if start_page*page_size > len(data):
        return data,len(data)
    return list(data)[start_page*page_size - 1:(start_page+1)*page_size - 1],len(data)