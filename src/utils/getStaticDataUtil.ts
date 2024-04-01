import { BASE_URL } from '@/enums/endpointsEnum';
import { ApiRequestError } from '@/errors/apiRequestError';
import { IApiResponse } from '@/interfaces/general';

type GetStaticDataParams = RequestInit & {
  search?: string;
  authToken?: string;
};

export const getStaticData = async <T>(
  url: string,
  init?: GetStaticDataParams
): Promise<IApiResponse<T> | undefined> => {
  const urlWithSearchParams = `${BASE_URL}${url}${
    init?.search ? `?${init?.search}` : ''
  }`;

  if (!init?.cache && !init?.next) {
    init = {
      ...init,
      next: {
        revalidate: 60 * 60, // 1 hour
      },
    };
  }

  const res = await fetch(urlWithSearchParams, {
    ...init,
    ...(!init?.method && { method: 'GET' }),
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${init?.authToken}`,
    },
  });

  const json = await res.json();
  if (!res.ok) {
    throw new ApiRequestError(json?.errors || [], res.status);
  }
  return json;
};
