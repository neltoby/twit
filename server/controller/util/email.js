const nodemailer = require("nodemailer")

module.exports = ({email, fullname}) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: "cb7c98e8c623bb",
            pass: "898a7cb80400ef"
        }
    });
    var mailOptions = {
        from: 'noreply@twitee.com',
        to: email,
        subject: 'Thank you for joining us',
        html: `<h3>Welcome onboard ${fullname}</h3>
        <p>Please we would love to always have you enjoy our platform!</p>
        <p>Do wel to always contact should find any difficulty</p>`
    };

    transporter.sendMail(mailOptions, (err, info) => {
        if(err){
            console.log(err)
        }else{
            console.log(info)
        }
    })
}

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Post:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         UserId:
 *           type: integer
 *         posts:
 *           type: string
 *         image:
 *           type: string
 *         createdAt:
 *           type: string
 *         Comments:
 *           type: array
 *         Likes:
 *           type: array
 *     Failed:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               success:
 *                 type: boolean
 *               msg: 
 *                  type: string
 *     responses:
 *       401:
 *          description: Authorization information is missing or invalid
 *          $ref: '#/component/schemas/Failed'       
 */