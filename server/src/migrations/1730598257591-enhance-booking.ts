import { MigrationInterface, QueryRunner } from "typeorm";

export class EnhanceBooking1730598257591 implements MigrationInterface {
    name = 'EnhanceBooking1730598257591'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "booking" DROP COLUMN "calendarId"`);
        await queryRunner.query(`ALTER TABLE "booking" DROP COLUMN "calendarEventId"`);
        await queryRunner.query(`ALTER TABLE "booking" DROP COLUMN "timeRequested"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "created" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "user" ADD "updated" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "booking" ADD "created" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "booking" ADD "updated" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "booking" ADD "parkId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "park" ADD "created" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "park" ADD "updated" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "court" ADD "created" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "court" ADD "updated" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "booking" DROP CONSTRAINT "FK_336b3f4a235460dc93645fbf222"`);
        await queryRunner.query(`ALTER TABLE "booking" DROP COLUMN "courtId"`);
        await queryRunner.query(`ALTER TABLE "booking" ADD "courtId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "booking" DROP COLUMN "status"`);
        await queryRunner.query(`CREATE TYPE "public"."booking_status_enum" AS ENUM('1', '2', '3')`);
        await queryRunner.query(`ALTER TABLE "booking" ADD "status" "public"."booking_status_enum" NOT NULL`);
        await queryRunner.query(`ALTER TABLE "booking" ALTER COLUMN "userId" SET NOT NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_cace4a159ff9f2512dd4237376" ON "user" ("id") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_49171efc69702ed84c812f3354" ON "booking" ("id") `);
        await queryRunner.query(`CREATE INDEX "IDX_5083431c6d0b9cc3dc5869325f" ON "booking" ("parkId") `);
        await queryRunner.query(`CREATE INDEX "IDX_8b05cb621694dc553f648575f6" ON "booking" ("start") `);
        await queryRunner.query(`CREATE INDEX "IDX_6f2af6f3cd446d61364a2fcab8" ON "booking" ("end") `);
        await queryRunner.query(`CREATE INDEX "IDX_83dda68f1025a4b14250ca017c" ON "booking" ("status") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_653802406812552d8de5f9a404" ON "park" ("id") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_d8f2118c52b422b03e0331a7b9" ON "court" ("id") `);
        await queryRunner.query(`ALTER TABLE "booking" ADD CONSTRAINT "FK_336b3f4a235460dc93645fbf222" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "booking" DROP CONSTRAINT "FK_336b3f4a235460dc93645fbf222"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d8f2118c52b422b03e0331a7b9"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_653802406812552d8de5f9a404"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_83dda68f1025a4b14250ca017c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_6f2af6f3cd446d61364a2fcab8"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_8b05cb621694dc553f648575f6"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_5083431c6d0b9cc3dc5869325f"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_49171efc69702ed84c812f3354"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_cace4a159ff9f2512dd4237376"`);
        await queryRunner.query(`ALTER TABLE "booking" ALTER COLUMN "userId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "booking" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "public"."booking_status_enum"`);
        await queryRunner.query(`ALTER TABLE "booking" ADD "status" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "booking" DROP COLUMN "courtId"`);
        await queryRunner.query(`ALTER TABLE "booking" ADD "courtId" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "booking" ADD CONSTRAINT "FK_336b3f4a235460dc93645fbf222" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "court" DROP COLUMN "updated"`);
        await queryRunner.query(`ALTER TABLE "court" DROP COLUMN "created"`);
        await queryRunner.query(`ALTER TABLE "park" DROP COLUMN "updated"`);
        await queryRunner.query(`ALTER TABLE "park" DROP COLUMN "created"`);
        await queryRunner.query(`ALTER TABLE "booking" DROP COLUMN "parkId"`);
        await queryRunner.query(`ALTER TABLE "booking" DROP COLUMN "updated"`);
        await queryRunner.query(`ALTER TABLE "booking" DROP COLUMN "created"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "updated"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "created"`);
        await queryRunner.query(`ALTER TABLE "booking" ADD "timeRequested" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "booking" ADD "calendarEventId" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "booking" ADD "calendarId" character varying NOT NULL`);
    }

}
