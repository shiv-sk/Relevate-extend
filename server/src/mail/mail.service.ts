/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { BadRequestException, Injectable } from '@nestjs/common';
import ConnectEmail from './templates/connectmail.template';
import { Resend } from 'resend';
import RejectEmail from './templates/rejectmail.template';

@Injectable()
export class MailService {
  resend = new Resend(process.env.RESEND_API_KEY);
  sendMail = async (
    subject: string,
    to: string,
    emailTemplate: React.ReactNode,
  ) => {
    const response = await this.resend.emails.send({
      from: 'Relevate <onboarding@aligno.live>',
      to,
      subject,
      react: emailTemplate,
    });
    return response;
  };
  async sendConnectMail(
    to: string,
    companyName: string,
    jobTitle: string,
    candidateName: string,
  ) {
    const subject = 'An employer is interested in your profile';
    if (!to || !companyName || !jobTitle || !candidateName) {
      throw new BadRequestException('Missing required parameters');
    }
    const connectEmailTemplate = await ConnectEmail({
      candidateName,
      companyName,
      jobTitle,
      title: subject,
    });
    const sendConnectEmail = await this.sendMail(
      subject,
      to,
      connectEmailTemplate,
    );
    return sendConnectEmail;
  }

  async sendRejectMail(
    to: string,
    companyName: string,
    jobTitle: string,
    candidateName: string,
  ) {
    const subject = 'Update on your job application';
    if (!to || !companyName || !jobTitle || !candidateName) {
      throw new BadRequestException('Missing required parameters');
    }
    const rejectEmailTemplate = await RejectEmail({
      candidateName,
      companyName,
      jobTitle,
      title: subject,
    });
    const sendRejectEmail = await this.sendMail(
      subject,
      to,
      rejectEmailTemplate,
    );
    return sendRejectEmail;
  }
}
