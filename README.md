# <img src="./imgs/logo.svg" width=30 height=30/> Ninja - fasten your iteration boost

 An auxiliary tool that can automatically generate interface `contract test cases`, reducing the amount of coding for developers, improving code quality, and helping to accelerate product iterations


## Scrum management
https://www.notion.so/efef23efd242410eb82321be0e9d59b0?v=26eeac409ac7444c8f216fa3846c7545&pvs=4


## RESTful API documents
see notion: [RESTful API](https://www.notion.so/RESTful-API-1d6e67b9e7474e9982aca0d1127b4b84?pvs=4)




## What capabilities does this tool provide?
The focus of this tool is to automatically generate test cases. After the developer/tester inputs the parameters and restrictions of the interface into this tool, this tool will generate **boundaries, exceptions, and normal cases** for the interface, and combine it with [Microsoft pict tool]((https://github.com/microsoft/pict)) to generate an appropriate amount of contract test cases. This avoids excessive output due to exhaustive methods.

## Usage (Containerized deployment to be completed)
### run frontend
```
cd ninja-web
npm i
npm run dev
```
### run backend
```
cd ninja-server
npm i
npm run dev
```
### run the testing-api
```
./api-server-for-testing
```

## Architecture
Frontend: React.js + Antd + Vite

Backend: Express.js

Other Tools: PICT



## Other links
- [Pact & Contract Testing](https://docs.pact.io/)
- [Pairwise Independent Combinatorial Testing （PICT）](https://github.com/microsoft/pict)


## Non-functional requirements
Our team may put emphasis on `Reliability`, `Usability`, `Maintainability`, and `Compatibility`, The specific embodiment is as follows：
> `Reliability`: Write robust code to handle errors and exceptions. Implement appropriate logging and error handling mechanisms to promptly detect and resolve issues. 

> `Usability`: Design intuitive and user-friendly interfaces to ensure users can easily interact with the tool. Provide relevant help documentation and user guides to acquaint users with the tool's features and usage.

> `Maintainability`/ `Testability`: Write clear, modular, and readable code to facilitate future maintenance and modifications. Use comments and documentation to explain code logic and design decisions. Adopt practices like test-driven development (TDD) and unit testing to ensure code quality and maintainability.

> `Compatibility`/ `portability`: Ensure compatibility across different platforms, operating systems, or browsers. Follow standards and specifications for seamless integration and interaction with other systems.
