import { ICustomerAddress, ITeam } from '@/interfaces';
import { IApiResponse } from '@/interfaces/general';
import { customerService } from '@/services/customerService';
import { teamService } from '@/services/teamService';

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
