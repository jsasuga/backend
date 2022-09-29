import { Exclude } from 'class-transformer';
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../role/role.entity';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  public id!: number;

  @Column({ type: 'varchar' })
  @ApiProperty()
  public email!: string;

  @Exclude()
  @Column({ type: 'varchar' })
  public password!: string;

  @Column({ type: 'varchar', nullable: true })
  @ApiProperty()
  public name: string | null;

  @Column({ type: 'timestamp', nullable: true, default: null })
  @ApiProperty()
  public lastLoginAt: Date | null;

  @ManyToOne(() => Role)
  @ApiProperty()
  public role: Role;
}
