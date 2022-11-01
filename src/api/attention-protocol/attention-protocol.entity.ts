import { BaseEntity, Column, DeleteDateColumn, Entity, JoinTable, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../user/user.entity';

@Entity()
export class AttentionProtocol extends BaseEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  public id!: number;

  @Column({ type: 'varchar', nullable: true})
  @ApiProperty()
  public data: string;

  @Column({ type: 'boolean', nullable: true})
  @ApiProperty()
  public confidentiality: boolean;

  @Column({ type: 'boolean', nullable: true})
  @ApiProperty()
  public consent: boolean;

  @Column({ type: 'boolean', nullable: true})
  @ApiProperty()
  public treatment: boolean;

  @Column({ type: 'varchar', nullable: true})
  @ApiProperty()
  public security: string;

  @Column({ type: 'varchar', nullable: true})
  @ApiProperty()
  public legalProtection: string;

  @Column({ type: 'varchar', nullable: true})
  @ApiProperty()
  public mental: string;

  @Column({ type: 'varchar', nullable: true})
  @ApiProperty()
  public financial: string;

  @Column({ type: 'varchar', nullable: true})
  @ApiProperty()
  public social: string;

  @Column({ type: 'varchar', nullable: true})
  @ApiProperty()
  public physical: string;

  @Column({ type: 'varchar', nullable: true})
  @ApiProperty()
  public strengths: string;

  @Column({ type: 'varchar', nullable: true})
  @ApiProperty()
  public comments: string;

  @Column({ type: 'timestamp', nullable: true})
  @ApiProperty()
  public completedAt: Date;

  @Column({ type: 'boolean', nullable: true})
  @ApiProperty()
  public completed: boolean;

  @Column({ type: 'timestamp', nullable: true})
  @ApiProperty()
  public createdAt: Date;

  @ManyToOne(() => User)
  @JoinTable()
  @ApiProperty()
  public userInCharge: User

  @DeleteDateColumn({ name: 'deleted_at', nullable: true, select: false })
  public deletedAt?: Date
}
