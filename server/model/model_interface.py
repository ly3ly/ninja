# from pydantic import BaseModel

# class ApiBody(BaseModel):
#     para_name:str
#     para_type:str
#     para_required:bool

# class ApiResponse(BaseModel):
#     success_code_value:str
#     success_code_type:str
#     fail_code_value:str
#     fail_code_type:str

# # Define a request parameter model
# class CreateInterfaceParams(BaseModel):
#     api_name: str
#     api_url:str
#     api_method:str
#     api_body:list[ApiBody]
#     api_respose:ApiResponse