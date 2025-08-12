import { MigrationInterface, QueryRunner } from "typeorm";

export class BookingEnum1730617718727 implements MigrationInterface {
    name = 'BookingEnum1730617718727'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "booking" DROP COLUMN "duration"`);
        await queryRunner.query(`CREATE TYPE "public"."booking_duration_enum" AS ENUM('30', '60', '90', '120')`);
        await queryRunner.query(`ALTER TABLE "booking" ADD "duration" "public"."booking_duration_enum" NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "booking" DROP COLUMN "duration"`);
        await queryRunner.query(`DROP TYPE "public"."booking_duration_enum"`);
        await queryRunner.query(`ALTER TABLE "booking" ADD "duration" integer NOT NULL`);
    }

}
