import { IAttendant, ITeam } from '@/interfaces';
import { teams } from '../teams';

const now = new Date();
const makeMockAttendant = (name: string, id: string, team: ITeam) => {
  return {
    id,
    name,
    email: 'carlosadriano@mail.com',
    cpf: '11111111111',
    birthDate: new Date(2002, 3, 2),
    team,
    createdAt: now,
    updatedAt: now,
  } as IAttendant;
};

export const attendants: IAttendant[] = [
  makeMockAttendant('João Mota', '1', teams[0]),
  makeMockAttendant('Marcelinho', '2', teams[1]),
  makeMockAttendant('Jorge Loch', '3', teams[0]),
];
