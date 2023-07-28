import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Participants } from './participants.entity';
import { Payment } from './payment.entity';

@Entity()
export class Bill {
  @PrimaryGeneratedColumn()
  id!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @OneToOne((type) => Participants, (participants) => participants.bill)
  participants!: Participants;

  @OneToMany((type) => Payment, (payment) => payment.bill)
  payments!: Payment[];
}
