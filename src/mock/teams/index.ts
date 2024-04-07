import { ITeam } from '@/interfaces';

const now = new Date();
const makeMockTeam = (name: string, id: string) => {
  return {
    id,
    name,
    created_at: now,
    updated_at: now,
  } as ITeam;
};

export const teams: ITeam[] = [
  makeMockTeam('Virutal', `2`),
  makeMockTeam('Loja', '4'),
];
