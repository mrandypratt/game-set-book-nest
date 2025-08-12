import {
  Entity,
  Column,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
  Index,
  OneToMany,
} from 'typeorm';
import { Park } from './park.entity';
import { CourtType, CourtConfiguration } from '@gamesetbook/shared';
import { AbstractBaseWithTimezone } from './base.entity';
import { Booking } from './booking.entity';

@Entity()
export class Court extends AbstractBaseWithTimezone {
  /**
   * The id of the court. Auto-Incremented.
   */
  @Index({ unique: true })
  @PrimaryGeneratedColumn('increment')
  id: number;

  /**
   * The id of the park that the court belongs to.
   */
  @Column({ nullable: false })
  parkId: number;

  /**
   * The court number within a park.
   * Count for Pickleball and Tennis within a Park both start at 1.
   */
  @Column({ nullable: false })
  courtNumber: number;

  /**
   * Tennis or Pickleball.
   */
  @Column({ nullable: false, enum: CourtType })
  type: CourtType;

  /**
   * How the court is configured with respect to Tennis and Pickleball.
   */
  @Column({ nullable: false, enum: CourtConfiguration })
  configuration: CourtConfiguration;

  /**
   * Unique identifier for composite courts, meaning a single Tennis Court
   * with multiple uses or multiple Pickleball courts on a single Tennis court.
   */
  @Column({ nullable: true, type: 'uuid' })
  compositeId?: string;

  /**
   * The park that the court belongs to.
   */
  @JoinColumn({ name: 'parkId', referencedColumnName: 'id' })
  @ManyToOne(() => Park, {
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE',
  })
  park: Park;

  /**
   * The list of bookings associated with the court.
   */
  @OneToMany(() => Booking, (booking) => booking.court, {
    cascade: ['insert', 'update', 'remove'],
  })
  bookings?: Booking[];
}
