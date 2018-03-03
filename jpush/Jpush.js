const JPush = require('jpush-sdk')
var { config } = "./config.js"
const client = JPush.buildClient(config.AppKey, config.MasterSecret);
/**
 * 极光推送，推送信息
 * @param uuid
 * @param content
 */
export async function jpush(uuid, content) {
    return new Promise((resolve, reject) => {
        client.push().setPlatform('ios', 'android')
            .setAudience(JPush.alias(uuid))
            .setNotification('MagHub', JPush.ios(content), JPush.android(content))
            .setOptions(null, 60)
            .send(function (err, res) {
                if (err) {
                    reject(err)
                } else {
                    console.log('Sendno: ' + res.sendno)
                    console.log('Msg_id: ' + res.msg_id)
                    resolve()
                }
            })
    })
}