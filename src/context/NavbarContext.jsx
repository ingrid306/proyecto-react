import { createContext, useContext, useState } from "react";

const NavbarContext = createContext();

export const NavbarProvider = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);
  const toggleCart = () => setIsCartOpen((prev) => !prev);
  const closeCart = () => setIsCartOpen(false);

  return (
    <NavbarContext.Provider
      value={{ isMenuOpen, toggleMenu, closeMenu, isCartOpen, toggleCart, closeCart }}
    >
      {children}
    </NavbarContext.Provider>
  );
};

export const useNavbar = () => {
  const ctx = useContext(NavbarContext);
  if (!ctx) throw new Error("useNavbar must be used inside NavbarProvider");
  return ctx;
};
