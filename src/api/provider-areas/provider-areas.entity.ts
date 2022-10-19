import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class ProviderAreas extends BaseEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  public id!: number;

  @Column({ type: 'varchar' })
  @ApiProperty()
  public name!: string;

  @Column({ type: 'varchar', nullable: true })
  @ApiProperty()
  public description: string | null;
}
