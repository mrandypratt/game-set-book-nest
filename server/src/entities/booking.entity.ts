import {
  Column,
  Entity,
  ManyToOne,
  Index,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import {
  BookingDurationMinutes,
  BookingDurations,
  BookingStatus,
} from '@gamesetbook/shared';
import { AbstractBaseWithTimezone } from './base.entity';
import { Park } from './park.entity';
import { Court } from './court.entity';

const DateTransformer = {
  to: (value: string) => value,
  from: (value: Date | string) => (value instanceof Date ? value.toISOString() : value),
};

@Entity()
export class Booking extends AbstractBaseWithTimezone {
  /**
   * The id of the user. UUID.
   */
  @Index({ unique: true })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**
   * The ID of the court being booked.
   */
  @Index({ unique: false })
  @Column({ nullable: false })
  courtId: number;

  /**
   * The ID of the park where the booking is taking place.
   */
  @Column({ nullable: false })
  parkId: number;

  /**
   * The timestamp when the booking was confirmed, if applicable.
   */
  @Column({
    nullable: true,
    type: 'timestamp',
    transformer: DateTransformer,
  })
  timeConfirmed?: string;

  /**
   * The start time of the booking.
   */
  @Index({ unique: false })
  @Column({
    nullable: false,
    unique: false,
    type: 'timestamp',
    transformer: DateTransformer,
  })
  start: string;

  /**
   * The end time of the booking.
   */
  @Index({ unique: false })
  @Column({
    nullable: false,
    unique: false,
    type: 'timestamp',
    transformer: DateTransformer,
  })
  end: string;

  /**
   * The duration of the booking in minutes.
   */
  @Column({ nullable: false, type: 'enum', enum: BookingDurations })
  duration: BookingDurationMinutes;

  /**
   * The current status of the booking: Pending, Confirmed or Cancelled.
   */
  @Index({ unique: false })
  @Column({ nullable: false, unique: false, type: 'enum', enum: BookingStatus })
  status: BookingStatus;

  /**
   * The ID of the user associated with the booking.
   */
  @Column({ nullable: false, type: 'uuid' })
  userId: string;

  /**
   * The user associated with the booking.
   */
  @ManyToOne(() => User, (user) => user.bookings)
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  user: User;

  /**
   * The user associated with the booking.
   */
  @ManyToOne(() => Park, (park) => park.bookings)
  @JoinColumn({ name: 'parkId', referencedColumnName: 'id' })
  park: Park;

  /**
   * The court associated with the booking.
   */
  @ManyToOne(() => Court, (court) => court.bookings)
  @JoinColumn({ name: 'courtId', referencedColumnName: 'id' })
  court: Court;
}
