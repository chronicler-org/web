import {
  ICustomer,
  ICustomerAddress,
  ICustomerCare,
  IProduct,
  ITeam,
} from '@/interfaces';
import { IApiResponse } from '@/interfaces/general';
import { customerCareService } from '@/services/customerCareService';
import { customerService } from '@/services/customerService';
import { productService } from '@/services/productService';
import { teamService } from '@/services/teamService';
import { displayDate } from './displayDateUtil';
import { formatCPF } from './stringutil';

export const fetchTeamOptions = (query?: URLSearchParams) => (name: string) => {
  const newQuery = new URLSearchParams(query?.toString() || '');
  newQuery.set('name', name);
  newQuery.forEach((value, key) => {
    if (!value || value === 'undefined' || value === 'none')
      newQuery.delete(key);
  });
  return teamService
    .all(newQuery.toString())
    .then((response: IApiResponse<ITeam[]>) => {
      return response.result.map(({ name, id }) => ({
        value: id,
        label: name,
      }));
    });
};

export const fetchCustomerAddressOptions =
  (query?: URLSearchParams) => (name: string) => {
    const newQuery = new URLSearchParams(query?.toString() || '');
    newQuery.set('street_name', name);
    newQuery.forEach((value, key) => {
      if (!value || value === 'undefined' || value === 'none')
        newQuery.delete(key);
    });
    return customerService
      .allCustomersAddresses(newQuery.toString())
      .then((response: IApiResponse<ICustomerAddress[]>) => {
        return response.result.map(
          ({ street_name, city, estate, number, id }) => ({
            value: id,
            label: `${street_name}, ${number}, ${city}, ${estate}`,
          })
        );
      });
  };

export const fetchCustomerOptions =
  (query?: URLSearchParams) => (name: string) => {
    const newQuery = new URLSearchParams(query?.toString() || '');
    newQuery.set('CustomerCPF', name);
    newQuery.forEach((value, key) => {
      if (!value || value === 'undefined' || value === 'none')
        newQuery.delete(key);
    });
    return customerService
      .allCustomers(newQuery.toString())
      .then((response: IApiResponse<ICustomer[]>) => {
        return response.result.map(({ name, cpf }) => ({
          value: cpf,
          label: `${name} - ${formatCPF(cpf)}`,
        }));
      });
  };

export const fetchCustomerCaresOptions =
  (query?: URLSearchParams) => (name: string) => {
    const newQuery = new URLSearchParams(query?.toString() || '');
    newQuery.set('customer_cpf', name);
    newQuery.forEach((value, key) => {
      if (!value || value === 'undefined' || value === 'none')
        newQuery.delete(key);
    });
    return customerCareService
      .allCustomerCares(newQuery.toString())
      .then((response: IApiResponse<ICustomerCare[]>) => {
        return response.result.map(({ customer, id, created_at }) => ({
          value: id,
          label: `${customer.name} - ${formatCPF(customer.cpf)} - Atendimento Criado em: ${displayDate(
            created_at,
            {
              hour: '2-digit',
              minute: '2-digit',
              day: '2-digit',
              month: '2-digit',
              year: '2-digit',
            }
          )}`,
        }));
      });
  };

export const fetchProductsOptions =
  (query?: URLSearchParams) => (name: string) => {
    const newQuery = new URLSearchParams(query?.toString() || '');
    newQuery.set('model', name);
    newQuery.forEach((value, key) => {
      if (!value || value === 'undefined' || value === 'none')
        newQuery.delete(key);
    });
    return productService
      .all(newQuery.toString())
      .then((response: IApiResponse<IProduct[]>) => {
        return response.result.map(
          ({ model, fabric, size, stock, value, id }) => ({
            value: id,
            label: `${model}, ${fabric}, ${size}: Estoque(${stock}) e ${value.toLocaleString(
              'pt-BR',
              {
                style: 'currency',
                currency: 'BRL',
              }
            )}`,
          })
        );
      });
  };
