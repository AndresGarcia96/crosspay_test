import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TransactionService } from '../services/transaction.service';
import { CreateTransactionDto } from '../dto/create-transaction.dto';
import { UpdateTransactionDto } from '../dto/update-transaction.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Auth } from '@/auth/decorators/auth.decorator';
import { RolesEnum } from '@/utils/enums/roles/roles.enum';

@ApiTags('transaction')
@ApiBearerAuth()
// @Auth(RolesEnum.SUPER_ADMIN)
@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  // POST METHODS //

  // @Auth(RolesEnum.ADMIN, RolesEnum.USER)
  @Post('/createTransaction/:userId')
  createTransaction(
    @Param('userId') userId: string,
    @Body() createTransactionDto: CreateTransactionDto,
  ) {
    return this.transactionService.createTransaction(
      userId,
      createTransactionDto,
    );
  }

  // GET METHODS //

  @Auth(RolesEnum.ADMIN)
  @Get('/findAllTransactions')
  findAllTransactions() {
    return this.transactionService.findAllTransactions();
  }

  @Auth(RolesEnum.ADMIN, RolesEnum.USER)
  @Get('/findOneTransaction/:id')
  findOneTransaction(@Param('id') id: string) {
    return this.transactionService.findOneTransaction(id);
  }

  // PATCH METHODS //

  @Auth(RolesEnum.ADMIN)
  @Patch('/updateTransaction/:id')
  updateTransaction(
    @Param('id') id: string,
    @Body() updateTransactionDto: UpdateTransactionDto,
  ) {
    return this.transactionService.updateTransaction(id, updateTransactionDto);
  }

  @Auth(RolesEnum.ADMIN)
  @Patch('/removeTransaction/:id')
  removeTransaction(@Param('id') id: string) {
    return this.transactionService.removeTransaction(id);
  }
}
