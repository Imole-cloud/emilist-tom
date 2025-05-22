"use client";

import { ReactNode } from 'react';
import { SearchProvider } from './SearchProvider';

interface ProvidersWrapperProps {
  children: ReactNode;
}

const ProvidersWrapper = ({ children }: ProvidersWrapperProps) => {
  return (
    <SearchProvider>
      {children}
    </SearchProvider>
  );
};

export default ProvidersWrapper;
