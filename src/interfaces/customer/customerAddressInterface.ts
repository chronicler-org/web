export interface ICustomerAddress {
  id: string;
  cep: string;
  state: string;
  city: string;
  neighborhood: string;
  street_name: string;
  number: string;
  complement: string;
  created_at: Date;
  updated_at: Date;
}
