import { BaseEntity, Column, Entity, JoinTable, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Provider } from '../provider/provider.entity';

@Entity()
export class Branch extends BaseEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  public id!: number;

  @Column({ type: 'varchar' })
  @ApiProperty()
  public name!: string;

  @Column({ type: 'varchar', nullable: true })
  @ApiProperty()
  public personInCharge: string | null;

  @Column({ type: 'varchar' })
  @ApiProperty()
  public address: string;

  @Column({ type: 'varchar', nullable: true })
  @ApiProperty()
  public email: string | null;

  @Column({ type: 'varchar' })
  @ApiProperty()
  public phoneNumber: string;

  @Column({ type: 'decimal', nullable: true })
  @ApiProperty()
  public latitude: number | null;

  @Column({ type: 'decimal', nullable: true })
  @ApiProperty()
  public longitude: number | null;

  @ManyToOne(() => Provider, (provider) => provider.branches)
  @JoinTable()
  @ApiProperty()
  public provider: Provider;
}
