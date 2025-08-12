import { MigrationInterface, QueryRunner } from "typeorm";

export class Timezones1730602414451 implements MigrationInterface {
    name = 'Timezones1730602414451'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "booking" ADD "timezone" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "park" ADD "timezone" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "court" ADD "timezone" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "court" DROP COLUMN "timezone"`);
        await queryRunner.query(`ALTER TABLE "park" DROP COLUMN "timezone"`);
        await queryRunner.query(`ALTER TABLE "booking" DROP COLUMN "timezone"`);
    }

}
