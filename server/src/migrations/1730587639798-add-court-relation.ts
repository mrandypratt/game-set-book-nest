import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCourtRelation1730587639798 implements MigrationInterface {
  name = 'AddCourtRelation1730587639798';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "court" DROP CONSTRAINT "FK_5029375d36e05e108220ab3f55e"`
    );
    await queryRunner.query(
      `ALTER TABLE "court" ADD CONSTRAINT "FK_5029375d36e05e108220ab3f55e" FOREIGN KEY ("parkId") REFERENCES "park"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "court" DROP CONSTRAINT "FK_5029375d36e05e108220ab3f55e"`
    );
    await queryRunner.query(
      `ALTER TABLE "court" ADD CONSTRAINT "FK_5029375d36e05e108220ab3f55e" FOREIGN KEY ("parkId") REFERENCES "park"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }
}
