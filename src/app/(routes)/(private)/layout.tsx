import Logo from '@/app/components/Logo';
import { List } from '@phosphor-icons/react/dist/ssr';
import { Session, getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { FC, ReactNode } from 'react';

import { Routes } from '@/enums/routesEnum';
import { nextAuthOptions } from '@/utils/nextAuthOptionsUtil';
import Link from 'next/link';

type LayoutProps = {
  children: ReactNode;
};

const Layout: FC<LayoutProps> = async ({ children }) => {
  const session = (await getServerSession(nextAuthOptions)) as Session;

  if (!session) redirect('/');

  return (
    <div className='drawer min-h-screen px-6'>
      <input id='drawer-toggle' type='checkbox' className='drawer-toggle' />
      <div className='drawer-content flex flex-col'>
        {/* Navbar */}
        <div className='navbar px-0'>
          <div className='navbar-start'>
            <a
              href='/'
              aria-label='Logo da Chronicler'
              className='btn btn-ghost px-0 text-2xl'
            >
              <Logo />
            </a>
          </div>
          <div className='navbar-end gap-2'>
            <div className='flex-none md:hidden'>
              {/* eslint jsx-a11y/label-has-associated-control: ["error", { assert: "either" } ] */}
              <label
                htmlFor='drawer-toggle'
                aria-label='Abre menu'
                className='btn btn-square btn-ghost text-2xl'
              >
                <List />
              </label>
            </div>

            <div className='hidden flex-none md:block'>
              <ul className='menu menu-horizontal'>
                {/* Navbar menu content */}
                <li>
                  <Link href={`/${Routes.CUSTOMERS}`}>Clientes</Link>
                </li>
                <li>
                  <Link href={`/${Routes.ATTENDANTS}`}>Atendentes</Link>
                </li>
                <li>
                  <Link href={`/${Routes.PRODUCTS}`}>Produtos</Link>
                </li>
                <li>
                  <Link href={`/${Routes.SALES}`}>Vendas</Link>
                </li>
              </ul>
            </div>
            <button
              type='button'
              className='avatar placeholder btn btn-circle btn-outline'
            >
              <div>
                <span>Ch</span>
              </div>
            </button>
          </div>
        </div>

        {/* Page content */}
        <div className='mx-auto flex w-full max-w-screen-2xl flex-1 flex-col'>
          {children}
        </div>
      </div>

      <div className='drawer-side'>
        <label
          htmlFor='drawer-toggle'
          aria-label='Fecha menu'
          className='drawer-overlay'
        />
        <ul className='menu min-h-full w-80 bg-base-200 p-4 text-lg'>
          {/* Sidebar content */}
          <li>
            <Link href={`/${Routes.CUSTOMERS}`}>Clientes</Link>
          </li>
          <li>
            <Link href={`/${Routes.ATTENDANTS}`}>Atendentes</Link>
          </li>
          <li>
            <Link href={`/${Routes.PRODUCTS}`}>Produtos</Link>
          </li>
          <li>
            <Link href={`/${Routes.SALES}`}>Vendas</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Layout;
