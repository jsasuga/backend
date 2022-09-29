import { BaseEntity, Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Module } from '../module/module.entity';

@Entity()
export class Role extends BaseEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  public id!: number;

  @Column({ type: 'varchar' })
  @ApiProperty()
  public name!: string;

  @Column({ type: 'varchar', nullable: true })
  @ApiProperty()
  public description: string | null;

  @ManyToMany(() => Module)
  @JoinTable()
  @ApiProperty()
  public permissions: Module[]
}
