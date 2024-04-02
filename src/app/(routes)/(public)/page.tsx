import Logo from '@/app/components/logo';

import { SignInForm } from './components/SignInForm';

const Page = () => {
  return (
    <main className='relative flex min-h-screen items-center justify-center bg-[url("/landscape.jpg")] bg-cover bg-center'>
      <div className='z-10 flex w-[min(26rem,100%)] flex-col gap-4 rounded-3xl px-4 py-12 sm:gap-8 sm:px-8 sm:backdrop-blur'>
        <Logo className='p-2 text-[min(3.75rem,15vw)] text-neutral' />
        <SignInForm />
      </div>
      <div className='absolute inset-0 backdrop-blur sm:hidden' />
      <footer className='absolute bottom-0 w-full bg-gradient-to-t from-black to-transparent px-4 py-2 text-center text-xl text-white'>
        Fotografia de{' '}
        <a href='https://unsplash.com/pt-br/@leo_visions' className='link'>
          Leo_Visions
        </a>{' '}
        na{' '}
        <a href='https://unsplash.com/pt-br' className='link'>
          Unsplash
        </a>
      </footer>
    </main>
  );
};

export default Page;
