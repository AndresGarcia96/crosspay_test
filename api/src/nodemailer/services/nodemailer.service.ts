import { Injectable } from '@nestjs/common';
import { SendEmailDto } from '../dto/send_email.dto';
import { MailerService } from '@nestjs-modules/mailer';
import {
  DEFAULT_EMAIL_FROM,
  NAME_EMAIL_FROM,
} from '../constants/email_config.constant';
import { join } from 'path';

@Injectable()
export class NodemailerService {
  constructor(private readonly mailerService: MailerService) {}

  async sendEmail(email: SendEmailDto) {
    const {
      from,
      recipients,
      subject,
      emailTemplate,
      userNameToEmail,
      userIdNumberToEmail,
      crosspayUrl,
      supportContactEmail,
      verificationCode,
      resetPasswordUrl,
    } = email;

    const emailSent = await this.mailerService.sendMail({
      from: from ?? {
        name: NAME_EMAIL_FROM,
        address: DEFAULT_EMAIL_FROM,
      },
      to: recipients,
      subject: subject,
      template: emailTemplate,
      context: {
        userNameToEmail,
        userIdNumberToEmail,
        crosspayUrl,
        supportContactEmail,
        verificationCode,
        resetPasswordUrl,
      },
      attachments: [
        {
          filename: 'crosspay-solutions-logo-color.svg',
          path: join(
            __dirname,
            '../../../assets/logos/crosspay-solutions-logo-color.svg',
          ),
          cid: 'logo_crosspay_color@crosspay.co',
        },
        {
          filename: 'crosspay-solutions-logo-blanco.svg',
          path: join(
            __dirname,
            '../../../assets/logos/crosspay-solutions-logo-blanco.svg',
          ),
          cid: 'logo_crosspay_blanco@crosspay.co',
        },
      ],
    });

    try {
      const response = await this.mailerService.sendMail(emailSent);

      return response;
    } catch (error) {
      console.log('Error al enviar correo: ', error);
    }
  }
}
