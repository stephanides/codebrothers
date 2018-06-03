import * as mongoose from 'mongoose';
import { Request, Response, NextFunction } from 'express';
import * as nodemailer from 'nodemailer';

export class Email {
  private transporter: nodemailer.Transporter;
  
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.zoho.eu',
      port: 465,
      secure: true, //ssl
      auth: {
        user:'info@codebrothers.sk',
        pass:'codebrothers963'
      }
    });
  }
  
  sendEmail(req: Request, res: Response, next: NextFunction) {
    this.transporter.sendMail({
      from: 'info@codebrothers.sk',
      to: 'info@codebrothers.sk',
      subject: 'codebrothers | Správa od: ' + req.body.email,
      text: req.body.name + " píše:\n" + req.body.text
    }, err => {
      if(err) {
        const newErr = new Error(err['response'])
        newErr['status'] = err['responseCode']

        return next(newErr)
      }
      else res.json({ message: 'Mail has been successfully sent', success: true })
    });
  }
}
