import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Bill } from './bill.entity';

@Entity()
export class Participants {
  @PrimaryGeneratedColumn()
  id!: number;

  @OneToOne((type) => Bill, (bill) => bill.participants)
  bill!: Bill;

  @Column({ type: 'text', array: true })
  users!: string[];

  @CreateDateColumn()
  createdAt!: Date;
}
