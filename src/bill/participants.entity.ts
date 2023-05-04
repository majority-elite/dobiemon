import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Bill } from './bill.model';

@Entity()
export class Participants {
  @PrimaryGeneratedColumn()
  id!: number;

  @OneToOne((type) => Bill, (bill) => bill.participants)
  bill!: Bill;

  @Column({ array: true })
  users!: string[];
}
