const nodemailer = require("nodemailer");
const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(
    "593027374094-d9sd3sht7nsfadgvlaoda4s2nljur06q.apps.googleusercontent.com",
    "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",
    "https://developers.google.com/oauthplayground"
);

oauth2Client.setCredentials({
    refresh_token: "1//04LRwQfJVksgZCgYIARAAGAQSNwF-L9IrgAMgbjKxILzhN7NnCCM39wRTNrw8dplC0x7dTGoG8SZ6bP2KDepLEEsanTzKI4qTHiU"
});

const accessToken = oauth2Client.getAccessToken();

const sendEmail = async (email, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            service: 'gmail',
            //secure: true,
            //secureConnection: false,
            auth: {
                type: "OAuth2",
                user: 'ctf18email@gmail.com',
                clientId: "593027374094-d9sd3sht7nsfadgvlaoda4s2nljur06q.apps.googleusercontent.com",
                clientSecret: "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",
                refreshToken: "1//04LRwQfJVksgZCgYIARAAGAQSNwF-L9IrgAMgbjKxILzhN7NnCCM39wRTNrw8dplC0x7dTGoG8SZ6bP2KDepLEEsanTzKI4qTHiU",
                accessToken: accessToken,
                //pass: 'IpeBe1309'
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        await transporter.sendMail({
            from: process.env.FROM_EMAIL,
            to: email,
            subject: subject,
            text: text,
        });

        console.log("Email sent sucessfully");
    }
    catch (error) {
        console.log(error, " Email not sent");
    }
};

module.exports = sendEmail;