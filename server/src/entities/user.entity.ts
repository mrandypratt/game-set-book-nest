import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Booking } from './booking.entity';
import { AbstractBase } from './base.entity';

@Entity()
export class User extends AbstractBase {
  /**
   * The id of the user. UUID.
   */
  @Index({ unique: true })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**
   * The email address of the user.
   */
  @Column({ nullable: false })
  email: string;

  /**
   * The hashed password of the user.
   */
  @Column({ nullable: true })
  passwordHash?: string;

  /**
   * The phone number of the user.
   */
  @Column({ nullable: true })
  phone?: string;

  /**
   * The first name of the user.
   */
  @Column({ nullable: true })
  firstName?: string;

  /**
   * The last name of the user.
   */
  @Column({ nullable: true })
  lastName?: string;

  /**
   * The list of bookings associated with the user.
   */
  @OneToMany(() => Booking, (booking) => booking.user)
  bookings: Booking[];
}
