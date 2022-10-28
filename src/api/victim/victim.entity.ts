import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Victim extends BaseEntity {
  @PrimaryColumn('integer', { nullable: false })
  @ApiProperty()
  public id!: number;

  @Column({ type: 'varchar', nullable: true })
  @ApiProperty()
  public name!: string;

  @Column({ type: 'varchar', nullable: true  })
  @ApiProperty()
  public otherName: string;

  @Column({ type: 'integer', nullable: true })
  @ApiProperty()
  public age: number;

  @Column({ type: 'varchar', nullable: true })
  @ApiProperty()
  public verifiedAge: number;

  @Column({ type: 'date', nullable: true })
  @ApiProperty()
  public birthday: string;

  @Column({ type: 'varchar', nullable: true })
  @ApiProperty()
  public citizenship: string;

  @Column({ type: 'varchar', nullable: true })
  @ApiProperty()
  public ethnicity: string;

  @Column({ type: 'varchar', nullable: true })
  @ApiProperty()
  public nationality: string;

  @Column({ type: 'integer', nullable: true })
  @ApiProperty()
  public maritalStatus: number;

  @Column({ type: 'integer', nullable: true })
  @ApiProperty()
  public children: number;

  @Column({ type: 'varchar', nullable: true })
  @ApiProperty()
  public originAddress: string;

  @Column({ type: 'varchar', nullable: true })
  @ApiProperty()
  public originCountry: string;

  @Column({ type: 'varchar', nullable: true })
  @ApiProperty()
  public currentAddress: string;

  @Column({ type: 'varchar', nullable: true })
  @ApiProperty()
  public phoneNumber: string;

  @Column({ type: 'varchar', nullable: true })
  @ApiProperty()
  public preferredLanguage: string;

  @Column({ type: 'integer', nullable: true })
  @ApiProperty()
  public genre: number;
}
