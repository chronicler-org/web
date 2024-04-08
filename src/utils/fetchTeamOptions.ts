import { ITeam } from '@/interfaces';
import { IApiResponse } from '@/interfaces/general';
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
