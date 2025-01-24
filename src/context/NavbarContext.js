import React, { createContext, useState, useContext } from "react"

const NavbarContext = createContext()

export const NavbarProvider = ({ children }) => {
  const [isNavbarVisible, setIsNavbarVisible] = useState(true)

  return <NavbarContext.Provider value={{ isNavbarVisible, setIsNavbarVisible }}>{children}</NavbarContext.Provider>
}

export const useNavbar = () => useContext(NavbarContext)

