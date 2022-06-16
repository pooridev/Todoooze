import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState
} from 'react';

import { ModalConfigType, ModalContextType } from '.';

const ModalContext = createContext<ModalContextType>({
  modalConfig: {} as ModalConfigType,
  changeModaConfig: () => {}
});

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [modalConfig, setModalConfig] = useState<ModalConfigType>({
    toggle: false
  });

  const { toggle } = modalConfig;

  const changeModaConfig = useCallback(
    (newModalConfig: ModalConfigType) => {
      setModalConfig(newModalConfig);
    },
    [toggle]
  );

  const value = useMemo(
    () => ({
      modalConfig,
      changeModaConfig
    }),
    [toggle]
  );

  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
}

export const useModal = () => {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error('useModal must be used under <ModalProvider/>');
  }
  return context;
};
