import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Court } from './court.entity';
import { AbstractBaseWithTimezone } from './base.entity';
import { Booking } from './booking.entity';

@Entity()
export class Park extends AbstractBaseWithTimezone {
  /**
   * The id of the park. Auto-Incremented.
   */
  @Index({ unique: true })
  @PrimaryGeneratedColumn('increment')
  id: number;

  /**
   * The name of the park.
   */
  @Column({ nullable: false })
  name: string;

  /**
   * The address line for the park.
   */
  @Column({ nullable: false })
  addressLine: string;

  /**
   * The city for the park.
   */
  @Column({ nullable: false })
  city: string;

  /**
   * The state for the park (e.g. CA).
   */
  @Column({ nullable: false })
  state: string;

  /**
   * The zip code for the park.
   */
  @Column({ nullable: false })
  zip: string;

  /**
   * Whether the park has lights.
   */
  @Column({ nullable: true })
  lighted?: boolean;

  /**
   * Whether the park has bathrooms.
   */
  @Column({ nullable: true })
  bathrooms?: boolean;

  /**
   * Whether the park is a tennis club.
   */
  @Column({ nullable: true })
  tennisClub?: boolean;

  /**
   * Whether the park has a tennis store.
   */
  @Column({ nullable: true })
  tennisStore?: boolean;

  /**
   * Whether the park has a fee.
   */
  @Column({ nullable: true })
  fee?: boolean;

  /**
   * Whether the park is restricted.
   */
  @Column({ nullable: true })
  restricted?: boolean;

  /**
   * The list of courts associated with the park.
   */
  @OneToMany(() => Court, (court) => court.park, {
    cascade: ['insert', 'update', 'remove'],
  })
  courts?: Court[];

  /**
   * The list of bookings associated with the park.
   */
  @OneToMany(() => Booking, (booking) => booking.park, {
    cascade: ['insert', 'update', 'remove'],
  })
  bookings?: Booking[];
}
