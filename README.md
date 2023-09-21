# <img src="./imgs/logo.svg" width=30 height=30/> Ninja - fasten your iteration boost

(To be improved) An auxiliary tool that can automatically generate interface `contract test cases`, reducing the amount of coding for developers, improving code quality, and helping to accelerate product iterations

## What is contract testing?
![contract testing](./imgs/image.png)

Contract testing is a technique for testing an integration point by checking each application in isolation to ensure the messages it sends or receives conform to a shared understanding that is documented in a "contract".

For applications that communicate via HTTP, these "messages" would be the HTTP request and response, and for an application that uses queues, this would be the message that goes on the queue.

In practice, a common way of implementing contract tests (and the way Pact does it) is to check that all the calls to your test doubles return the same results as a call to the real application would.

## Why need contract test?
Contract testing is important for several reasons:

1. Dependency management: Contract testing helps in managing dependencies between services or components in a distributed system. It ensures that each service understands and adheres to the expected behavior of the other services it interacts with, preventing compatibility issues and runtime failures.

2. Early detection of issues: Contract tests allow you to identify breaking changes or compatibility issues between services early in the development process. By verifying that the contracts are still valid, you can catch potential problems before they propagate downstream and cause more significant issues.

3. Faster development and deployment: Contract testing enables independent development and deployment of services. With well-defined contracts, teams can work on their services in parallel without waiting for other services to be fully implemented. This accelerates the development and deployment process, fostering agility and faster time-to-market.

4. Improved collaboration between teams: Contract testing promotes collaboration among teams responsible for different services. By defining and testing contracts, teams can establish a common understanding of the expected behavior and communication protocols. This facilitates smoother integration, reduces misunderstandings, and enhances overall teamwork.

5. Increased system reliability and stability: Contract testing helps ensure that services communicate correctly and consistently. By verifying the contracts, you can minimize the risk of errors, unexpected behavior, and cascading failures in a distributed system. This ultimately improves the reliability and stability of the entire system.

In summary, contract testing is essential for managing dependencies, detecting issues early, speeding up development and deployment, fostering collaboration, and enhancing system reliability. It is a valuable practice in building robust and scalable distributed systems.

## What capabilities does this tool provide?
The focus of this tool is to automatically generate contract test cases. After the developer/tester inputs the parameters and restrictions of the interface into this tool, this tool will generate **boundaries, exceptions, and normal cases** for the interface, and combine it with [Microsoft pict tool]((https://github.com/microsoft/pict)) to generate an appropriate amount of contract test cases. This avoids excessive output due to exhaustive methods.

## Usage (Containerized deployment to be completed)
```
> run frontend: cd web/react-mui see readme
> run backend: cd server && npm i && npm run start
```


## Architecture
Frontend: React.js + MUI

Backend: express.js

Other Tools: docker, （database）, PICT



## Non-functional requirements
Our team may put emphasis on `Reliability`, `Usability`, `Maintainability`, and `Compatibility`, The specific embodiment is as follows：
> `Reliability`: Write robust code to handle errors and exceptions. Implement appropriate logging and error handling mechanisms to promptly detect and resolve issues. 

> `Usability`: Design intuitive and user-friendly interfaces to ensure users can easily interact with the tool. Provide relevant help documentation and user guides to acquaint users with the tool's features and usage.

> `Maintainability`/ `Testability`: Write clear, modular, and readable code to facilitate future maintenance and modifications. Use comments and documentation to explain code logic and design decisions. Adopt practices like test-driven development (TDD) and unit testing to ensure code quality and maintainability.

> `Compatibility`/ `portability`: Ensure compatibility across different platforms, operating systems, or browsers. Follow standards and specifications for seamless integration and interaction with other systems.


## Other links
- [Pact & Contract Testing](https://docs.pact.io/)
- [Pairwise Independent Combinatorial Testing （PICT）](https://github.com/microsoft/pict)

## Contributors
.


## RESTful API documents
### **Common Struct Definition**
### 1. API_HEADER
(not implemented)

### 2. API_BODY
| Parameter Name    | Required/Optional | Type   | Constrains        | Describe     |
| --------- | ---- | ------ | --------------- | -------- |
| para_name   | R   | string | not null |  |
| para_type | R   | string | `number/string/array/object` |      |
| number_para_constrain | O   | {min:string,max:string} | required only when `para_type` is `number`      | eg. {"max":"100","min":"-1"}  |
| string_para_constrain | O   | string array  | optional value of this parameter, required only when `para_type` is `string`, omit empty      | eg.["apple","juice","pear"]  |
| array_para_constrain | O   | array| required only when `para_type` is `array`      | not implemented |
| object_para_constrain | O   | API_BODY array| required only when `para_type` is `object`      | body contains structure |
| para_required | R   | Boolean | `true/false`      | whether this parameter is required or not   |

```

{
    "para_name": "userid",
    "para_type": "number",
    "para_required": true,
    "number_para_constrain": {
        "min": -1,
        "max": 100
    }
}
,

{
    "para_name": "username",
    "para_type": "string",
    "para_required": true
}
,

{
    "para_name": "user_language",
    "para_type": "string",
    "para_required": true,
    "string_para_constrain": ["zh-cn","zh-hk","zh-tw"]
}
,

{
    "para_name": "user_detail",
    "para_type": "object",
    "para_required": false,
    "object_para_constrain": [
        {
            "para_name": "user_gender",
            "para_type": "string",
            "para_required": true,
            "string_para_constrain": ["male","female","other"]
        },
        {
            "para_name": "user_age",
            "para_type": "number",
            "para_required": true,
            "number_para_constrain": {
                                        "min": 18,
                                        "max": 120
                                    }
        }
    ]
}
```

### 3. API_RESPONSE
| Parameter Name    | Required/Optional | Type   | Constrains        | Describe     |
| --------- | ---- | ------ | --------------- | -------- |
| success_code_value   | R   | string | not null | value of success code |
| success_code_type | R   | string | `number/string` | type of success code     |
| fail_code_value | R   | string | not null      | value of fail code   |
| fail_code_type | R   | string | `number/string`      | type of fail code   |

**NOTES**: In some cases, return codes are not always numbers. So it's necessary to distinguish them.
```

{
    "success_code_value": "0",
    "success_code_type": "number",
    "fail_code_value": "-1",
    "fail_code_type": "number"
}

```

---
### **1. Create a new API**
#### 1.1. Description
##### Create a new API
#### 1.2. Request URL
#####  `{baseurl}/api/interface`
#### 1.3. Request Method
##### **POST**
#### 1.4. Header Parameters  
| Parameter Name       | Required/Optional | Type/Value      | Describe         |
| ------------ | ---- | ---------------- | ------------ |
| Content-Type |  R  | application/json | Request parameter type |

#### 1.5. Body Parameters 

| Parameter Name    | Required/Optional | Type   | Constrains        | Describe     |
| --------- | ---- | ------ | --------------- | -------- |
| api_name   | R   | string | not null | name of api |
| api_url  | R   | string | not null | url of api     |
| api_method | R   | string | `POST`/`GET`/`PUT`/`DELETE`      | method of api   |
| api_header | O   | API_HEADER | not implemented      | header of api   |
| api_body | R   | API_BODY array | see definition      | body of api   |
| api_respose | R   | API_RESPONSE |  see definition     | response of api   |

**NOTES**: Currently only focus on apis which parameters are carried in the request body. (Apis with `GET` methods won't be considered in this version.) 
```
{
    "api_name":"update user information",
    "api_url":"https://www.testprj.com/api/user",
    "api_method":"PUT",
    "api_respose":{
        "success_code_value":"0",
        "success_code_type":"number",
        "fail_code_value":"999",
        "fail_code_type":"number"
    },
    "api_body":[
        {
            "para_name":"userid",
            "para_type":"number",
            "para_required":true,
            "number_para_constrain":{
                "min":-1,
                "max":100
            }
        },
        {
            "para_name":"username",
            "para_type":"string",
            "para_required":true
        },
        {
            "para_name":"user_language",
            "para_type":"string",
            "para_required":true,
            "string_para_constrain":[
                "zh-cn",
                "zh-hk",
                "zh-tw"
            ]
        },
        {
            "para_name":"user_detail",
            "para_type":"object",
            "para_required":false,
            "object_para_constrain":[
                {
                    "para_name":"user_gender",
                    "para_type":"string",
                    "para_required":true,
                    "string_para_constrain":[
                        "male",
                        "female",
                        "other"
                    ]
                },
                {
                    "para_name":"user_age",
                    "para_type":"number",
                    "para_required":true,
                    "number_para_constrain":{
                        "min":18,
                        "max":120
                    }
                }
            ]
        }
    ]
}
```

#### 1.6. Response
| Parameter Name    | Required/Optional | Type   | Constrains        | Describe     |
| --------- | ---- | ------ | --------------- | -------- |
| code   | R   | number | `success: 0`, ` fail: other` | return code |
| msg  | R   | string | not null | description of returning     |
|data | O| {"api_id":string} | | return data|
```
{
    "code": 0,
    "msg": "success"
    "data":{
        "api_id":"uuid-xxxx-xxxx-xxxx"
    }
}
,

{
    "code": 999,
    "msg": "found error in..."
}
```


### **2. Read an existing API**
#### 2.1. Description
#####   Read an existing API
#### 2.2. Request URL
#####  `{baseurl}/api/interface/{api_id}`
#### 2.3. Request Method
##### **GET**
#### 2.4. Header Parameters  
| Parameter Name       | Required/Optional | Type/Value      | Describe         |
| ------------ | ---- | ---------------- | ------------ |
| Content-Type |  R  | application/json | Request parameter type |

#### 2.5. URL Parameters 

| Parameter Name    | Required/Optional | Type   | Constrains        | Describe     |
| --------- | ---- | ------ | --------------- | -------- |
| api_id | R | string | not null | id of api|

```
{
    "https://{baseurl}/api/interface/uuid-xxxx-xxxx-xxxx"
}
```

#### 2.6. Response
| Parameter Name    | Required/Optional | Type   | Constrains        | Describe     |
| --------- | ---- | ------ | --------------- | -------- |
| code   | R   | number | `success: 0`, ` fail: other` | return code |
| msg  | R   | string | not null | description of returning     |
|data | O| same as `Definiton 4.6` | | return data|
```
{
    "code": 0,
    "msg": "success"
    "data":{}
}
,

{
    "code": 999,
    "msg": "found error in..."
}
```


### **3. Read existing API list**
#### 3.1. Description
#####   Read existing API list
#### 3.2. Request URL
#####  `{baseurl}/api/interfaces`
#### 3.3. Request Method
##### **POST**
#### 3.4. Header Parameters  
| Parameter Name       | Required/Optional | Type/Value      | Describe         |
| ------------ | ---- | ---------------- | ------------ |
| Content-Type |  R  | application/json | Request parameter type |

#### 3.5. Body Parameters 

| Parameter Name    | Required/Optional | Type   | Constrains        | Describe     |
| --------- | ---- | ------ | --------------- | -------- |
| start_page | R | number | >0 | start page|
| page_size | R | number | >0 | page size|

```
{
    "start_page":0,
    "page_size":100
}
```

#### 3.6. Response
| Parameter Name    | Required/Optional | Type   | Constrains        | Describe     |
| --------- | ---- | ------ | --------------- | -------- |
| code   | R   | number | `success: 0`, ` fail: other` | return code |
| msg  | R   | string | not null | description of returning     |
|data | O| see example | | return data|
```
{
    "code": 0,
    "msg": "success"
    "data":{
        "total": 1000, //total data
        "value":[{
            "api_id":"uuid-xxxx-xxxx-xxxx",
            "api_name":"create a product",
            "api_url":"https://www.testprj.com/api/product",
            "api_method":"POST"
        },{
            "api_id":"uuid-xxxx-xxxx-xxxx",
            "api_name":"update a product",
            "api_url":"https://www.testprj.com/api/product",
            "api_method":"PUT"
        }]
    }
}
,

{
    "code": 999,
    "msg": "found error in..."
}
```



### **4. Update an existing API**
#### 4.1. Description
#####   Update an existing API
#### 4.2. Request URL
#####  `{baseurl}/api/interface`
#### 4.3. Request Method
##### **PUT**
#### 4.4. Header Parameters  
| Parameter Name       | Required/Optional | Type/Value      | Describe         |
| ------------ | ---- | ---------------- | ------------ |
| Content-Type |  R  | application/json | Request parameter type |

#### 4.5. Body Parameters 

| Parameter Name    | Required/Optional | Type   | Constrains        | Describe     |
| --------- | ---- | ------ | --------------- | -------- |
| api_id | R | string | not null | id of api|
| api_name   | R   | string | not null | name of api |
| api_url  | R   | string | not null | url of api     |
| api_method | R   | string | `POST`/`GET`/`PUT`/`DELETE`      | method of api   |
| api_header | O   | API_HEADER | not implenment      | header of api   |
| api_body | R   | API_BODY array | see definition      | body of api   |
| api_respose | R   | API_RESPONSE |  see definition     | response of api   |

**NOTES**: Currently only focus on apis which parameters are carried in request body. (Apis with `GET` methods won't be considered in this version.) 
```
{
    "api_name":"update user information",
    "api_url":"https://www.testprj.com/api/user",
    "api_method":"PUT",
    "api_respose":{
        "success_code_value":"0",
        "success_code_type":"number",
        "fail_code_value":"999",
        "fail_code_type":"number"
    },
    "api_body":[{...}]
        
}
```

#### 4.6. Response
| Parameter Name    | Required/Optional | Type   | Constrains        | Describe     |
| --------- | ---- | ------ | --------------- | -------- |
| code   | R   | number | `success: 0`, ` fail: other` | return code |
| msg  | R   | string | not null | description of returning     |
|data | O| {"api_id":string} | | return data|
```
{
    "code": 0,
    "msg": "success"
    "data":{
        "api_id":"uuid-xxxx-xxxx-xxxx"
    }
}
,

{
    "code": 999,
    "msg": "found error in..."
}
```


### **5. Delete an existing API**
#### 5.1. Description
#####   Delete an existing API
#### 5.2. Request URL
#####  `{baseurl}/api/interface`
#### 5.3. Request Method
##### **DELETE**
#### 5.4. Header Parameters  
| Parameter Name       | Required/Optional | Type/Value      | Describe         |
| ------------ | ---- | ---------------- | ------------ |
| Content-Type |  R  | application/json | Request parameter type |

#### 5.5. Body Parameters 

| Parameter Name    | Required/Optional | Type   | Constrains        | Describe     |
| --------- | ---- | ------ | --------------- | -------- |
| api_id | R | string | not null | id of api|

**NOTES**: Currently only focus on apis which parameters are carried in request body. (Apis with `GET` methods won't be considered in this version.) 
```
{
    "api_id":"uuid-xxxx-xxxx-xxxx",    
}
```

#### 5.6. Response
| Parameter Name    | Required/Optional | Type   | Constrains        | Describe     |
| --------- | ---- | ------ | --------------- | -------- |
| code   | R   | number | `success: 0`, ` fail: other` | return code |
| msg  | R   | string | not null | description of returning     |
|data | O| {"api_id":string} | | return data|
```
{
    "code": 0,
    "msg": "success"
    "data":{
        "api_id":"uuid-xxxx-xxxx-xxxx"
    }
}
,

{
    "code": 999,
    "msg": "found error in..."
}
```



### **5. Generate testcase**
#### 5.1. Description
#####   Generate testcase
#### 5.2. Request URL
#####  `{baseurl}/api/interface/gen`
#### 5.3. Request Method
##### **POST**
#### 5.4. Header Parameters  
| Parameter Name       | Required/Optional | Type/Value      | Describe         |
| ------------ | ---- | ---------------- | ------------ |
| Content-Type |  R  | application/json | Request parameter type |

#### 5.5. Body Parameters 

| Parameter Name    | Required/Optional | Type   | Constrains        | Describe     |
| --------- | ---- | ------ | --------------- | -------- |
| api_id | R | string | not null | id of api|

```
{
    "api_id":"uuid-xxxx-xxxx-xxxx",    
}
```

#### 5.6. Response (to be continued...)
| Parameter Name    | Required/Optional | Type   | Constrains        | Describe     |
| --------- | ---- | ------ | --------------- | -------- |
| code   | R   | number | `success: 0`, ` fail: other` | return code |
| msg  | R   | string | not null | description of returning     |
|data | O| testcase array | | return data|
```
{
    "code": 0,
    "msg": "success"
    "data":[]
}
,

{
    "code": 999,
    "msg": "found error in..."
}
```
