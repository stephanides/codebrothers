"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer = require("nodemailer");
class Email {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: 'smtp.zoho.eu',
            port: 465,
            secure: true,
            auth: {
                user: 'info@codebrothers.sk',
                pass: 'codebrothers963'
            }
        });
    }
    sendEmail(req, res, next) {
        this.transporter.sendMail({
            from: 'info@codebrothers.sk',
            to: 'info@codebrothers.sk',
            subject: 'codebrothers | Správa od: ' + req.body.email,
            text: req.body.name + " píše:\n" + req.body.text
        }, err => {
            if (err) {
                const newErr = new Error(err['response']);
                newErr['status'] = err['responseCode'];
                return next(newErr);
            }
            else
                res.json({ message: 'Mail has been successfully sent', success: true });
        });
    }
}
exports.Email = Email;
//# sourceMappingURL=Email.controller.js.map