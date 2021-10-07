const nodemailer = require("nodemailer");

const sendEmail = async (email, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            service: 'gmail',
            secure: true,
            secureConnection: false,
            auth: {
                user: 'ipebe1309@gmail.com',
                pass: 'IpeBe1309'
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