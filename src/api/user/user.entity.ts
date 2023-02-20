import { Exclude } from 'class-transformer';
import { BaseEntity, Column, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../role/role.entity';
import { Provider } from '../provider/provider.entity';
import { Victim } from '../victim/victim.entity';

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

  @Column({ type: 'varchar', nullable: true })
  @ApiProperty()
  public userCode: string | null;

  @Column({ type: 'varchar', nullable: true })
  @ApiProperty()
  public lastName: string | null;

  @Column({ type: 'timestamp', nullable: true, default: null })
  @ApiProperty()
  public lastLoginAt: Date | null;

  @ManyToOne(() => Role)
  @ApiProperty()
  public role: Role;

  @ManyToOne(() => Provider)
  @ApiProperty()
  public provider: Provider;

  @ManyToOne(() => Victim)
  @ApiProperty()
  public victim: Victim;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true, select: false })
  public deletedAt?: Date
}
