import { FC, PropsWithChildren } from "react";

export const combineProviders = (providers: FC<PropsWithChildren>[]) => {
  // eslint-disable-next-line
  return providers.reduce((Combined, Provider) => ({ children }) => (
    <Combined>
      <Provider>{children}</Provider>
    </Combined>
  ));
};
