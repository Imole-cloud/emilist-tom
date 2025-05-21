"use client";

import { ReactNode } from 'react';
import { SearchProvider } from '../utils/SearchProvider';
import ReactQueryProvider from './ReactQueryProvider';

interface ProvidersWrapperProps {
  children: ReactNode;
}

const ProvidersWrapper = ({ children }: ProvidersWrapperProps) => {
  return (
    <ReactQueryProvider>
      <SearchProvider>
        {children}
      </SearchProvider>
    </ReactQueryProvider>
  );
};

export default ProvidersWrapper;
