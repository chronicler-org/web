import { BrazilianStates } from '@/enums';

export interface ICustomerAddress {
  id: string;
  cep: string;
  estate: BrazilianStates;
  city: string;
  neighborhood: string;
  street_name: string;
  number: string;
  complement: string;
  created_at: Date;
  updated_at: Date;
}
