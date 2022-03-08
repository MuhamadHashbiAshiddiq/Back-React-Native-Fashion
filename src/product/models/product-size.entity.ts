import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('sizes')
export class ProductSize {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
