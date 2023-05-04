import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Bill {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: string;
}
