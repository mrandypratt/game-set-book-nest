import { DataSource } from 'typeorm';
import { Booking } from '../entities/booking.entity';
import { Court } from '../entities/court.entity';
import { Park } from '../entities/park.entity';
import { User } from '../entities/user.entity';
import * as Migrations from '../migrations';
import 'dotenv/config';

const {
  PGDATABASE: database,
  PGHOST: host,
  PGPASSWORD: password,
  PGPORT: dbPort,
  PGUSER: username,
} = process.env;

const logging = true;
const schema = 'public';
const synchronize = false;
const type = 'postgres';

export const AppDataSource = new DataSource({
  type,
  schema,
  host,
  port: +(dbPort || '5432'),
  username,
  password,
  database,
  synchronize,
  logging,
  entities: [Booking, Court, Park, User],
  migrations: Object.values(Migrations),
  migrationsTableName: 'migrations',
});
