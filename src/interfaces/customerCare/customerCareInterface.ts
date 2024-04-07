import { ICustomer } from '../customer/customerInterface';
import { ITeam } from '../team';

export interface ICustomerCare {
  id: string;
  date: Date;
  customer: ICustomer;
  Team: ITeam;
  created_at: Date;
  updated_at: Date;
}
