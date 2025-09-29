import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { User } from '@/user/entities/user.entity';
import { IdentificationTypeEnum } from '@/utils/enums/id_type/identification_type.enum';
import { CurrencyTypeEnum } from '@/utils/enums/currency_type/currency_type.enum';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: CurrencyTypeEnum })
  currency_type: CurrencyTypeEnum;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  transfer_amount: number;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'text' })
  paying_username: string;

  @Column({ type: 'enum', enum: IdentificationTypeEnum })
  paying_user_id_type: IdentificationTypeEnum;

  @Column({ type: 'text' })
  paying_user_id_number: string;

  @Column({ type: 'text' })
  card_number: string;

  @Column({ type: 'text' })
  card_expiration: string;

  @Column({ type: 'text' })
  card_cvv: string;

  @ManyToOne(() => User, (user) => user.transactions, { eager: true })
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
