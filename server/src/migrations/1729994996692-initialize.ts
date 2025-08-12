import { MigrationInterface, QueryRunner } from 'typeorm';

export class Initialize1729994996692 implements MigrationInterface {
  name = 'Initialize1729994996692';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "passwordHash" character varying, "phone" character varying, "firstName" character varying, "lastName" character varying, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "booking" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "courtId" character varying NOT NULL, "calendarId" character varying NOT NULL, "calendarEventId" character varying NOT NULL, "timeRequested" TIMESTAMP NOT NULL, "timeConfirmed" TIMESTAMP, "start" TIMESTAMP NOT NULL, "end" TIMESTAMP NOT NULL, "duration" integer NOT NULL, "status" integer NOT NULL, "userId" uuid, CONSTRAINT "PK_49171efc69702ed84c812f33540" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "park" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "addressLine" character varying NOT NULL, "city" character varying NOT NULL, "state" character varying NOT NULL, "zip" character varying NOT NULL, "lighted" boolean, "bathrooms" boolean, "tennisClub" boolean, "tennisStore" boolean, "fee" boolean, "restricted" boolean, CONSTRAINT "PK_653802406812552d8de5f9a4047" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "court" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "calendarId" character varying NOT NULL, "courtNumber" integer NOT NULL, "type" integer NOT NULL, "configuration" integer NOT NULL, "compositeId" uuid, "parkId" uuid, CONSTRAINT "PK_d8f2118c52b422b03e0331a7b91" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "booking" ADD CONSTRAINT "FK_336b3f4a235460dc93645fbf222" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "court" ADD CONSTRAINT "FK_5029375d36e05e108220ab3f55e" FOREIGN KEY ("parkId") REFERENCES "park"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "court" DROP CONSTRAINT "FK_5029375d36e05e108220ab3f55e"`
    );
    await queryRunner.query(
      `ALTER TABLE "booking" DROP CONSTRAINT "FK_336b3f4a235460dc93645fbf222"`
    );
    await queryRunner.query(`DROP TABLE "court"`);
    await queryRunner.query(`DROP TABLE "park"`);
    await queryRunner.query(`DROP TABLE "booking"`);
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
