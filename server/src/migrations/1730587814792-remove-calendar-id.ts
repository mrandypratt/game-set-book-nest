import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveCalendarId1730587814792 implements MigrationInterface {
    name = 'RemoveCalendarId1730587814792'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "court" DROP COLUMN "calendarId"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "court" ADD "calendarId" character varying NOT NULL`);
    }

}
