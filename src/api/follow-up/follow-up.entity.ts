import { BaseEntity, Column, DeleteDateColumn, Entity, JoinTable, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Case } from '../case/case.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class FollowUp extends BaseEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  public id!: number;

  @Column({ type: 'timestamp', nullable: true})
  @ApiProperty()
  public date: string;

  @Column({ type: 'varchar', nullable: true})
  @ApiProperty()
  public decisions: string;

  @Column({ type: 'varchar', nullable: true})
  @ApiProperty()
  public lawyer: string;

  @Column({ type: 'varchar', nullable: true})
  @ApiProperty()
  public tribunal: string;

  @Column({ type: 'timestamp', nullable: true})
  @ApiProperty()
  public nextAudienceDate: string;

  @Column({ type: 'boolean', nullable: true})
  @ApiProperty()
  public canceled: boolean;

  @Column({ type: 'varchar', nullable: true})
  @ApiProperty()
  public cancelledReason: string;

  @ManyToOne(() => Case, (c) => c.followUps)
  @Exclude()
  @JoinTable()
  public case: Case;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true, select: false })
  public deletedAt?: Date

  @Column({ type: 'timestamp', nullable: true})
  @ApiProperty()
  public createdAt: Date;
}
