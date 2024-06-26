import { Session, getServerSession } from 'next-auth';

import { nextAuthOptions } from '@/utils/nextAuthOptionsUtil';

const Page = async () => {
  const session = (await getServerSession(nextAuthOptions)) as Session;
  return <h2 className='text-3xl'>Bem vindo, {session.user.name}!</h2>;
};

export default Page;
