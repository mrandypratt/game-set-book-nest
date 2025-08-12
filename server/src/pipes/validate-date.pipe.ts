import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

export const ISO_DATE_REGEX =
  /^(?:[0-9]{4}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1\d|2\d|3[01])))$/;

/**
 * @param date - Datestring
 * Returns true if datestring is in the format 'YYYY-MM-DD'
 */
export const isISODateString = (dateString: string): boolean => {
  return ISO_DATE_REGEX.test(dateString);
};

@Injectable()
export class ValidateDatePipe implements PipeTransform {
  transform(value: any) {
    if (!isISODateString(value)) {
      throw new BadRequestException(`Date must be in the format YYYY-MM-DD`);
    }
    return value;
  }
}
