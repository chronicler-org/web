import Logo from '@/app/components/Logo';
import { SignInForm } from './components/SignInForm';

const Page = () => {
  return (
    <main className='relative flex h-dvh items-center justify-center'>
      <div className='flex w-[min(26rem,100%)] flex-col gap-4 rounded-3xl px-4 py-12'>
        <Logo className='p-2 text-[min(3.75rem,15vw)]' />
        <SignInForm />
      </div>
    </main>
  );
};

export default Page;
