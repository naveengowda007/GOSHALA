import React, { createContext, useContext, useState } from "react";

const DrawerContext = createContext();

export const DrawerProvider = ({ children }) => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [drawerContent, setDrawerContent] = useState(null);

  const openDrawer = (content) => {
    setDrawerContent(content); // Set dynamic content
    setDrawerOpen(true); // Open drawer
  };

  const closeDrawer = () => {
    setDrawerOpen(false); // Close drawer
    setDrawerContent(null); // Clear content
  };

  return (
    <DrawerContext.Provider value={{ isDrawerOpen, drawerContent, openDrawer, closeDrawer }}>
      {children}
    </DrawerContext.Provider>
  );
};

export const useDrawer = () => useContext(DrawerContext);
