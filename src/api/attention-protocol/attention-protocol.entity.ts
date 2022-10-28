import { BaseEntity, Column, Entity, JoinTable, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../user/user.entity';

@Entity()
export class AttentionProtocol extends BaseEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  public id!: number;

  @Column({ type: 'varchar'})
  @ApiProperty()
  public data: string;

  @Column({ type: 'boolean'})
  @ApiProperty()
  public confidentiality: boolean;

  @Column({ type: 'boolean'})
  @ApiProperty()
  public consent: boolean;

  @Column({ type: 'boolean'})
  @ApiProperty()
  public treatment: boolean;

  @Column({ type: 'varchar'})
  @ApiProperty()
  public security: string;

  @Column({ type: 'varchar'})
  @ApiProperty()
  public legalProtection: string;

  @Column({ type: 'varchar'})
  @ApiProperty()
  public mental: string;

  @Column({ type: 'varchar'})
  @ApiProperty()
  public financial: string;

  @Column({ type: 'varchar'})
  @ApiProperty()
  public social: string;

  @Column({ type: 'varchar'})
  @ApiProperty()
  public physical: string;

  @Column({ type: 'varchar'})
  @ApiProperty()
  public strengths: string;

  @Column({ type: 'varchar'})
  @ApiProperty()
  public comments: string;

  @ManyToOne(() => User)
  @JoinTable()
  @ApiProperty()
  public userInCharge: User
}
