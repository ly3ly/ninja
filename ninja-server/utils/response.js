
const Response = (code, data, msg) => {
    return {
        code,
        data,
        msg
    }
}

const SuccessResponse = (data, msg) => {
    return {
        code: 0,
        data,
        msg
    }
}
const ErrorResponse = (code, data, msg) => {
    return {
        code,
        data,
        msg
    }
}
module.exports = {
    Response,
    SuccessResponse,
    ErrorResponse
}