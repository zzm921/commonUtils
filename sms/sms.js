
const crypto = require('crypto')
const request = require("request")

function postAsync(opt, statusCode = 200) {
    return new Promise((resolve, reject) => {
        request.post(opt, function (error, response, body) {
            if (error)
                return reject(error)
            if (response.statusCode !== statusCode)
                return reject("bad code " + response.statusCode)
            resolve(body)
        })
    })
}

const app_key = ''  //网易云信appkey
const app_secret = ''   // app_secret
const timeout = 20
const tpl_id = 3084053 // 模板id
const tpl_id_devid = 3050200

function randomInt(from, to) {
    return Math.floor(Math.random() * (to - from) + from)
}


/**
 * 发送验证码
 * @param {*} phone
 */
export async function sendSms(phone) {
    //let str_param = `'${msg}'\",\"'${code}'`
    let timestamp = Math.round(new Date().getTime() / 1000)
    let cur_time = timestamp.toString()
    let nonce = `${cur_time}${randomInt(10000, 99999)}`

    let str = app_secret + nonce + cur_time
    let checkSum = crypto.createHash('sha1').update(str).digest("hex")

    let options = {
        url: "https://api.netease.im/sms/sendcode.action",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'AppKey': app_key,
            'CurTime': cur_time,
            'CheckSum': checkSum,
            "Nonce": nonce
        },
        body: `mobile=${phone}&templateid=${tpl_id}`
    }
    console.log("request--->")
    let body = await postAsync(options)
    console.log(body)
    return body
}

/**
 * 发送其他模板信息
 * @param {*} phone
 * @param {*} devid
 * @param {*} time_str
 * @param {*} time_str_add
 */
export async function devSendSms(phone, params) {
    let timestamp = Math.round(new Date().getTime() / 1000)
    let cur_time = timestamp.toString()
    let nonce = `${cur_time}${randomInt(10000, 99999)}`

    let str = app_secret + nonce + cur_time
    let checkSum = crypto.createHash('sha1').update(str).digest("hex")

    let options = {
        url: "https://api.netease.im/sms/sendtemplate.action",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'AppKey': app_key,
            'CurTime': cur_time,
            'CheckSum': checkSum,
            "Nonce": nonce
        },
        form: {
            templateid: tpl_id_devid,
            mobiles: JSON.stringify([phone]),
            params: JSON.stringify([params])   //发送模板的参数
        }
    }
    console.log("request--->")
    let body = await postAsync(options)
    return body
}