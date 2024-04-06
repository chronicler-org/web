import { ICustomer } from '../customer/customerInterface';
import { ITeam } from '../team';

export interface ICustomerCare {
  id: string;
  date: Date;
  Customer: ICustomer;
  Team: ITeam;
  created_at: Date;
  updated_at: Date;
}
