import { FC, ReactNode } from "react";

export const combineProviders = (providers: FC<{ children: ReactNode }>[]) =>
  providers.reduce((Combined, Provider) => ({ children }) => (
    <Combined>
      <Provider>{children}</Provider>
    </Combined>
  ));
