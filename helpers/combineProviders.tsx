import { FC, ReactNode } from 'react';

type FCWithChildren = FC<{ children: ReactNode }>;

export const combineProviders = (providers: FCWithChildren[]) =>
  providers.reduce((Combined, Provider) => ({ children }) => (
    <Combined>
      <Provider>{children}</Provider>
    </Combined>
  ));
