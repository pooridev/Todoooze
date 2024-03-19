import { PropsWithChildren, ReactNode } from "react";
import { createContext, useContext, useState } from "react";

type SidebarContextType = {
  isOpen: boolean;
  closeSidebar: () => void;
  openSidebar: () => void;
};

const SidebarContext = createContext<SidebarContextType>({
  isOpen: false,
  closeSidebar: () => {},
  openSidebar: () => {},
});

const SidebarProvider = ({ children }: PropsWithChildren) => {
  const [isOpen, setIsOpen] = useState(false);

  const openSidebar = () => setIsOpen(true);
  const closeSidebar = () => setIsOpen(false);

  const value = {
    isOpen,
    openSidebar,
    closeSidebar,
  };

  return <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>;
};

const useSidebar = () => useContext(SidebarContext);

export { useSidebar, SidebarProvider };
