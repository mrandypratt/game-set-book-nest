import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangedIndex1730619654545 implements MigrationInterface {
    name = 'ChangedIndex1730619654545'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_5083431c6d0b9cc3dc5869325f"`);
        await queryRunner.query(`CREATE INDEX "IDX_af1f96549b26bc9eb36f0afbaf" ON "booking" ("courtId") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_af1f96549b26bc9eb36f0afbaf"`);
        await queryRunner.query(`CREATE INDEX "IDX_5083431c6d0b9cc3dc5869325f" ON "booking" ("parkId") `);
    }

}
