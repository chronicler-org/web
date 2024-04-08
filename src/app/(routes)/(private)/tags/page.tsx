import { Session, getServerSession } from 'next-auth';

import { EndPoints } from '@/enums/endpointsEnum';
import { IApiResponse, ITag } from '@/interfaces';
import { getStaticData } from '@/utils/getStaticDataUtil';
import { nextAuthOptions } from '@/utils/nextAuthOptionsUtil';

import { TagsTable } from './components/TagsTable';

const Page = async () => {
  const session = (await getServerSession(nextAuthOptions)) as Session;

  const initalTagsResponse = (await getStaticData<ITag[]>(`/${EndPoints.TAG}`, {
    search: 'limite=10&pagina=1&order=created_at:DESC',
    cache: 'no-store',
    authToken: session.authToken,
  })) as IApiResponse<ITag[]>;
  return <TagsTable initalTagsResponse={initalTagsResponse} />;
};

export default Page;
