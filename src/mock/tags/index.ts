import { ITag } from '@/interfaces';

const now = new Date();
const makeMockTag = (name: string, id: string, color: string) => {
  return {
    id,
    color,
    name,
    createdAt: now,
    updatedAt: now,
  } as ITag;
};

export const tags: ITag[] = [
  makeMockTag('Hot Lead', `2`, '#ea580c'),
  makeMockTag('Tag A', '4', '#f0abfc'),
  makeMockTag('Black Friday', `1`, '#000'),
  makeMockTag('Tag B', '5', '#6ee7b7'),
  makeMockTag('Tag C', '6', '#fcd34d'),
  makeMockTag('Tag D', '7', '#451a03'),
  makeMockTag('Cold Lead', '3', '#0284c7'),
];
