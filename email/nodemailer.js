const nodemailer = require("nodemailer");
import { emailOpt, fromEmail } from "./config.js"
let transporter = nodemailer.createTransport(emailOpt);
/**
 *
 * @param {*} emailto  接收者
 * @param {*} html     发送的html
 * @param {*} content   发送的内容
 */
export async function send(emailto, html, content, subject) {
    let mailOptions = {
        from: fromEmail, // 发送者
        to: emailto, // 接受者   to:email1,email2  同时发送给多人
        subject: subject, // 标题
        html: html, // 文本
        attachments: [{
            filename: 'test.txt',
            content: 'hello world!'
        }, {
            filename: 'test.txt',
            content: 'hello world!',
            contentType: 'text/plain'
        }]   //发送的文件
    };
    let res = await transporter.sendMail(mailOptions);
    return res
}


//使用
await send(emailto, html, content, subject)
