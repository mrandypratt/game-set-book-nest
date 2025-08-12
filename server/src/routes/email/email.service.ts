import { Injectable, Logger } from '@nestjs/common';
import * as sgMail from '@sendgrid/mail';
import { ConfigService } from '@nestjs/config';
import { Booking, Park } from 'src/entities';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { DateTime } from 'luxon';
import { BOOKING_EXPIRATION_MINUTES } from '@gamesetbook/shared';

abstract class SharedEmailTemplateData {
  parkName: string;
  courtNumber: number;
  parkAddress: string;
  start: string;
  duration: number;
}

export class RequestBookingEmailTemplateData extends SharedEmailTemplateData {
  confirmationUrl: string;
  expiration: string;
}

export class ConfirmationEmailTemplateData extends SharedEmailTemplateData {
  bookingId: string;
  cancellationUrl: string;
}
export class CancellationEmailTemplateData extends SharedEmailTemplateData {
  bookingId: string;
  bookingUrl: string;
}

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  private readonly senderEmail: string;
  private readonly frontendUrl: string;
  private readonly requestBookingTemplateId: string;
  private readonly confirmationTemplateId: string;
  private readonly cancellationTemplateId: string;

  constructor(
    @InjectRepository(Park)
    private readonly parkRepo: Repository<Park>,
    private readonly configService: ConfigService
  ) {
    sgMail.setApiKey(this.configService.get<string>('SENDGRID_API_KEY'));
    this.senderEmail = this.configService.get<string>('SENDER_EMAIL');
    this.frontendUrl = this.configService.get<string>('FRONTEND_URL');
    this.requestBookingTemplateId = this.configService.get<string>(
      'SENDGRID_REQUEST_BOOKING_TEMPLATE_ID'
    );
    this.confirmationTemplateId = this.configService.get<string>(
      'SENDGRID_CONFIRMATION_TEMPLATE_ID'
    );
    this.cancellationTemplateId = this.configService.get<string>(
      'SENDGRID_CANCELLATION_TEMPLATE_ID'
    );
  }

  private async sendEmail(msg: sgMail.MailDataRequired): Promise<void> {
    try {
      await sgMail.send(msg);
      this.logger.log(`Email sent successfully to ${msg.to}`);
    } catch (error) {
      this.logger.error('Error sending email:', error);
      throw error;
    }
  }

  async sendRequestBookingEmail(booking: Booking, email: string): Promise<void> {
    try {
      const { id: bookingId, parkId, courtId, start, end, duration, created } = booking;

      this.logger.log({ bookingId, parkId, courtId, start, end, duration, created });

      const park = await this.parkRepo.findOne({
        where: { id: parkId },
        relations: ['courts'],
      });

      const { name: parkName, addressLine, city, state, zip } = park;

      const templateData: RequestBookingEmailTemplateData = {
        parkName,
        parkAddress: `${addressLine}, ${city}, ${state} ${zip}`,
        courtNumber: park.courts.find((c) => c.id === courtId).courtNumber,
        start: `${DateTime.fromISO(start).toFormat('MMM d, yyyy h:mma')} ${park.timezone}`,
        duration,
        confirmationUrl: `${this.frontendUrl}/confirm?bookingId=${bookingId}&email=${encodeURIComponent(email)}`,
        expiration: DateTime.fromJSDate(created)
          .plus({ minutes: BOOKING_EXPIRATION_MINUTES })
          .toFormat('yyyy-MM-dd HH:mm'),
      };

      const msg = {
        to: email,
        from: this.senderEmail,
        templateId: this.requestBookingTemplateId,
        dynamicTemplateData: templateData,
      };

      this.logger.log({ sendRequestBookingEmailData: msg });

      await this.sendEmail(msg);
    } catch (error) {
      this.logger.error('sendRequestBookingEmail Error Gathering Data');
      throw error;
    }
  }

  async sendConfirmationEmail(booking: Booking): Promise<void> {
    try {
      const { id: bookingId, start, duration, park, court, user } = booking;

      const { name: parkName, addressLine, city, state, zip } = park;

      const templateData: ConfirmationEmailTemplateData = {
        bookingId,
        parkName,
        parkAddress: `${addressLine}, ${city}, ${state} ${zip}`,
        courtNumber: court.courtNumber,
        start: `${DateTime.fromISO(start).toFormat('MMM d, yyyy h:mma')} ${park.timezone}`,
        duration,
        cancellationUrl: `${this.frontendUrl}/cancel?bookingId=${bookingId}&email=${encodeURIComponent(user.email)}`,
      };

      const msg = {
        to: user.email,
        from: this.senderEmail,
        templateId: this.confirmationTemplateId,
        dynamicTemplateData: templateData,
      };

      this.logger.log({ sendConfirmationEmailData: msg });

      await this.sendEmail(msg);
    } catch (error) {
      this.logger.error('sendConfirmationEmail Error Gathering Data');
      throw error;
    }
  }
  async sendCancellationEmail(booking: Booking): Promise<void> {
    try {
      const { id: bookingId, start, duration, park, court, user } = booking;

      const { name: parkName, addressLine, city, state, zip } = park;

      const templateData: CancellationEmailTemplateData = {
        bookingId,
        parkName,
        parkAddress: `${addressLine}, ${city}, ${state} ${zip}`,
        courtNumber: court.courtNumber,
        start: `${DateTime.fromISO(start).toFormat('MMM d, yyyy h:mma')} ${park.timezone}`,
        duration,
        bookingUrl: `${this.frontendUrl}`,
      };

      const msg = {
        to: user.email,
        from: this.senderEmail,
        templateId: this.cancellationTemplateId,
        dynamicTemplateData: templateData,
      };

      this.logger.log({ sendCancellationEmailData: msg });

      await this.sendEmail(msg);
    } catch (error) {
      this.logger.error('sendCancellationEmail Error Gathering Data');
      throw error;
    }
  }
}
