import { FC } from 'react';

export const combineProviders = (providers: FC[]) =>
  providers.reduce((Combined, Provider) => ({ children }) => (
    <Combined>
      <Provider>{children}</Provider>
    </Combined>
  ));
