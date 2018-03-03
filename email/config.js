export const emailOpt = {
    host: "smtp.qiye.163.com",
    secureConnection: true,
    port: 25,
    tls: { rejectUnauthorized: false },   //  报错 unable to verify the first certificate时，增加
    auth: {
        user: "youremail",
        pass: "yourpassword"
    }
}
export const fromEmail = "youremail"

