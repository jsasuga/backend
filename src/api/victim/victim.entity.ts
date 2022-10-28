import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Victim extends BaseEntity {
  @PrimaryColumn('integer', { nullable: false })
  @ApiProperty()
  public id!: number;

  @Column({ type: 'varchar' })
  @ApiProperty()
  public name!: string;

  @Column({ type: 'varchar', nullable: true  })
  @ApiProperty()
  public otherName: string;

  @Column({ type: 'integer' })
  @ApiProperty()
  public age: number;

  @Column({ type: 'varchar' })
  @ApiProperty()
  public verifiedAge: number;

  @Column({ type: 'date' })
  @ApiProperty()
  public birthday: Date;

  @Column({ type: 'varchar' })
  @ApiProperty()
  public citizenship: string;

  @Column({ type: 'varchar' })
  @ApiProperty()
  public ethnicity: string;

  @Column({ type: 'varchar' })
  @ApiProperty()
  public nationality: string;

  @Column({ type: 'integer' })
  @ApiProperty()
  public maritalStatus: number;

  @Column({ type: 'integer' })
  @ApiProperty()
  public children: number;

  @Column({ type: 'varchar' })
  @ApiProperty()
  public originAddress: string;

  @Column({ type: 'varchar' })
  @ApiProperty()
  public originCountry: string;

  @Column({ type: 'varchar' })
  @ApiProperty()
  public currentAddress: string;

  @Column({ type: 'varchar' })
  @ApiProperty()
  public phoneNumber: string;

  @Column({ type: 'varchar' })
  @ApiProperty()
  public preferredLanguage: string;

  @Column({ type: 'integer' })
  @ApiProperty()
  public genre: number;
}
