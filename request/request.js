import * as request from "request"

function requestCommon(method, opt, statusCode) {
    return new Promise((resolve, reject) => {
        method(opt, function (error, response, body) {
            if (error)
                return reject(error)

            if (response.statusCode !== statusCode)
                return reject("bad code " + response.statusCode)

            resolve(body)
        })
    })
}

export function getAsync(opt, statusCode = 200) {
    return requestCommon(request, opt, statusCode)
}

export function patchAsync(opt, statusCode = 200) {
    return requestCommon(request.patch, opt, statusCode)
}

export function postAsync(opt, statusCode = 200) {
    return requestCommon(request.post, opt, statusCode)
}

export function putAsync(opt, statusCode = 200) {
    return requestCommon(request.put, opt, statusCode)
}

