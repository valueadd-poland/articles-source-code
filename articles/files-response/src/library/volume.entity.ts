import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity(`volumes`)
export class VolumeEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  isbn!: string;

  @Column()
  title!: string;
}
