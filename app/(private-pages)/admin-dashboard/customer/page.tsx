import { searchParamsCache } from '@/lib/searchparams';
import React from 'react';
import EmployeeListingPage from './_components/employee-listing-page';
import { SearchParams } from 'nuqs';

type pageProps = {
  searchParams: SearchParams;
};

export const metadata = {
  title: 'Dashboard : Customers',
};

export default async function Page({ searchParams }: pageProps) {
  // Allow nested RSCs to access the search params (in a type-safe way)
  searchParamsCache.parse(searchParams);

  return <EmployeeListingPage />;
}
