import { IdentificationTypeEnum } from "../enums/id_type/identification_type.enum";
import { IRole } from "./role.interface";
import { ITransaction } from "./transaction.interface";

export interface IUser {
  id: string;
  name: string | null;
  last_name: string | null;
  id_type: IdentificationTypeEnum | null;
  id_number: string | null;
  birthdate?: string | null;
  email: string | null;
  cellphone?: number | null;
  password?: string;
  verification_code?: number | null;
  role: IRole[];
  residence_department?: string | null;
  residence_city?: string | null;
  residence_address?: string | null;
  residence_neighborhood?: string | null;
  is_active: boolean;
  transactions?: ITransaction[];
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
  errors?: string[];
}
