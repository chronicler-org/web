import { ICustomer, ITag } from '@/interfaces';
import { tags } from '../tags';

const now = new Date();
const makeMockCustomer = (name: string, id: string, tags: ITag[]) => {
  return {
    id,
    cpf: '11111111111',
    name,
    email: 'carlosadriano@mail.com',
    phone: '79999999999',
    birth_date: now,
    tags,
    Address: {
      id: '42',
      cep: '49000000',
      city: 'Aracaju',
      number: '42',
      state: 'Sergipe',
      street_name: 'Rua 42',
      complement: 'Entre ruas 41 e 43',
      neighborhood: 'Bairro 42',
      created_at: now,
      updated_at: now,
    },
    created_at: now,
    updated_at: now,
  } as ICustomer;
};

export const customers: ICustomer[] = [
  makeMockCustomer('Carlos Adriano', '1', tags.slice(0, 2)),
  makeMockCustomer('Vanessa Souza', '2', tags.slice(0, 1)),
  makeMockCustomer('Ádrian Gama', '3', tags.slice(0, 2)),
];
