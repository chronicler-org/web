'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React, { FC, ReactNode } from 'react';

type ReactQueryProviderProps = {
  children: ReactNode;
};
export const ReactQueryProvider: FC<ReactQueryProviderProps> = ({
  children,
}) => {
  const [client] = React.useState(
    new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: Infinity,
          refetchIntervalInBackground: false,
          retry: false,
        },
      },
    })
  );

  return (
    <QueryClientProvider client={client}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
