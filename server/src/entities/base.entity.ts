import { Timezone } from '@gamesetbook/shared';
import { Column, CreateDateColumn, Index, UpdateDateColumn } from 'typeorm';

import { PrimaryGeneratedColumn } from 'typeorm';

export abstract class AbstractBase {
  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;
}

export abstract class AbstractBaseWithTimezone extends AbstractBase {
  /**
   * The timezone for the park where the booking is taking place.
   */
  @Column({
    nullable: false,
    type: 'varchar',
    enum: Timezone,
  })
  timezone: Timezone;
}
