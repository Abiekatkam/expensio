"use client";

import { createContext, useContext, useMemo, useState } from "react";

const SidebarContext = createContext(null);

export const SidebarContextProvider = ({ children }) => {
  const [showMenu, setShowMenu] = useState(false);

  const value = useMemo(() => ({ showMenu, setShowMenu }), [showMenu, setShowMenu]);

  return (
    <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
  );
};

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error(`useSidebar must be used within a SidebarContext.`);
  }
  return context;
};
