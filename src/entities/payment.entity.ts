import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Bill } from './bill.entity';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne((type) => Bill, (bill) => bill.payments)
  bill!: Bill;

  @Column({ type: 'text' })
  item_name!: string;

  @Column({ type: 'integer' })
  item_price!: number;

  @Column({ array: true })
  users!: string[];
}
