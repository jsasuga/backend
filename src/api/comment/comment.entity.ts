import { BaseEntity, Column, DeleteDateColumn, Entity, JoinTable, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../user/user.entity';
import { Case } from '../case/case.entity';

@Entity()
export class Comment extends BaseEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  public id!: number;

  @Column({ type: 'varchar'})
  @ApiProperty()
  public text: string;

  @ManyToOne(() => User)
  @JoinTable()
  @ApiProperty()
  public user: User;

  @ManyToOne(() => Case, (c) => c.comments)
  @JoinTable()
  public case: Case;
  
  @Column({ type: 'timestamp', nullable: true})
  @ApiProperty()
  public createdAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true, select: false })
  public deletedAt?: Date
}
