import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTransactionDto } from '../dto/create-transaction.dto';
import { UpdateTransactionDto } from '../dto/update-transaction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from '../entities/transaction.entity';
import { User } from '@/user/entities/user.entity';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // CREATE FUNTIONS //

  async createTransaction(
    userId: string,
    transactionDto: CreateTransactionDto,
  ): Promise<Transaction> {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new HttpException(
        `El usuario con id ${userId} no existe.`,
        HttpStatus.NOT_FOUND,
      );
    }

    const transaction = this.transactionRepository.create({
      ...transactionDto,
      user,
    });

    return this.transactionRepository.save(transaction);
  }

  // GET FUNTIONS //

  async findAllTransactions(): Promise<Transaction[]> {
    return this.transactionRepository.find();
  }

  async findOneTransaction(id: string): Promise<Transaction> {
    const tx = await this.transactionRepository.findOne({ where: { id } });
    if (!tx) {
      throw new HttpException(
        `La transacción con id ${id} no existe.`,
        HttpStatus.NOT_FOUND,
      );
    }
    return tx;
  }

  // UPDATE FUNTIONS //

  async updateTransaction(
    id: string,
    dto: UpdateTransactionDto,
  ): Promise<Transaction> {
    const tx = await this.findOneTransaction(id);

    const updated = Object.assign(tx, dto);
    return this.transactionRepository.save(updated);
  }

  async removeTransaction(id: string): Promise<{ deleted: boolean }> {
    const tx = await this.findOneTransaction(id);
    await this.transactionRepository.softRemove(tx);
    return { deleted: true };
  }
}
