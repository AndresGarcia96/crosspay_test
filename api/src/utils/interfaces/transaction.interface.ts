import { IdentificationTypeEnum } from "../enums/id_type/identification_type.enum";
import { CurrencyTypeEnum } from "../enums/currency_type/currency_type.enum";
import { IUser } from "./user.interface";

export interface ITransaction {
  id: string;
  currency_type: CurrencyTypeEnum;
  transfer_amount: number;
  description: string;
  paying_username: string;
  paying_user_id_type: IdentificationTypeEnum;
  paying_user_id_number: string;
  card_number: string;
  card_expiration: string;
  card_cvv: string;
  user: IUser;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
}
