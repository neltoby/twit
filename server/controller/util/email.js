const nodemailer = require("nodemailer")
const { google } = require('googleapis');
const { OAuth2 } = google.auth;

const OAUTH_PLAYGROUND = 'https://developers.google.com/oauthplayground';

const {
    CLIENT_ID,
    CLIENT_SECRET,
    REFRESH_TOKEN,
    USER,
  } = process.env

const oauth2Client = new OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    OAUTH_PLAYGROUND
);
module.exports = ({email, fullname}) => {
    oauth2Client.setCredentials({
        refresh_token: REFRESH_TOKEN,
    })

    const accessToken = oauth2Client.getAccessToken()
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            type: 'OAuth2',
            user: USER,
            clientId: CLIENT_ID,
            clientSecret: CLIENT_SECRET,
            refreshToken: REFRESH_TOKEN,
            accessToken,
          },
    });
    var mailOptions = {
        from: `no-reply@twittee.com <m***@gmail.com>`,
        to: email,
        subject: 'Thank you for joining us',
        html: `<h3>Welcome onboard ${fullname}</h3>
        <p>Please we would love to always have you enjoy our platform!</p>
        <p>Do well to always contact should you find any difficulty</p>`,   
        replyTo: 'no-reply@twittee.com',
    };

    transporter.sendMail(mailOptions, (err, info) => {
        if(err){
            console.log(err)
        }else{
            console.log(info)
        }
    })
}
