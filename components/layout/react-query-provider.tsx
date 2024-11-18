import React, { useState } from 'react';
import {
  QueryClient,
  QueryClientProvider,
  QueryCache,
  MutationCache
} from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { AxiosError } from 'axios';
import { useSetAtom } from 'jotai';
import { toast } from 'sonner';
import { userAtom } from '@/store/user';

const logout = (setUser: any, router: any) => {
  toast.error('Unauthorized access, logging out...');
  //   setUser(defaultUser);x
  // router.push("/sign-in");
};

const errorHandler = (err: unknown, router: any, setUser: any) => {
  if (err instanceof AxiosError && err.response?.status === 401) {
    logout(setUser, router);
  } else {
    const { error, message, status } = err as any;
    if (error === 'Unauthorized') {
      logout(setUser, router);
    } else {
      toast.error(error);
    }
  }
};

const createQueryClient = (
  router: ReturnType<typeof useRouter>,
  setUser: any
) =>
  new QueryClient({
    queryCache: new QueryCache({
      onError: (error: unknown) => {
        errorHandler(error, router, setUser);
      }
    }),
    mutationCache: new MutationCache({
      onError: (error: unknown, _: unknown, __: unknown, mutation: any) => {
        errorHandler(error, router, setUser);
      }
    })
  });

function ReactQueryProvider({ children }: React.PropsWithChildren<{}>) {
  const router = useRouter();
  const setUser = useSetAtom(userAtom);

  const [client] = useState(() => createQueryClient(router, setUser));

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}

export default ReactQueryProvider;
