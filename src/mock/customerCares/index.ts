import { ICustomer, ICustomerCare, ITeam } from '@/interfaces';
import { customers } from '../customers';
import { teams } from '../teams';

const now = new Date();
const makeMockCustomerCare = (customer: ICustomer, id: string, Team: ITeam) => {
  return {
    id,
    customer,
    Team,
    date: now,
    created_at: now,
    updated_at: now,
  } as ICustomerCare;
};

export const customerCares: ICustomerCare[] = [
  makeMockCustomerCare(customers[0], '1', teams[0]),
  makeMockCustomerCare(customers[2], '2', teams[1]),
  makeMockCustomerCare(customers[1], '3', teams[0]),
];
