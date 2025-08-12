import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { BookingDurations } from '@gamesetbook/shared';

@Injectable()
export class ValidateDurationPipe implements PipeTransform {
  transform(value: any) {
    if (!BookingDurations.includes(value)) {
      throw new BadRequestException(
        `Duration must be ${BookingDurations.join(', ')} minutes`
      );
    }
    return value;
  }
}
