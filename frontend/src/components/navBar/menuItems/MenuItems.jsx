import React, { createContext, useState } from 'react'
import { ButtonBars } from '../buttonBars/ButtonBars'
import { MenuBars } from '../menuBars/MenuBars'
import { NavItems } from '../navItems/NavItems'

export const NavBarContext = createContext()

export default function MenuItems() {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <NavBarContext.Provider value={{ isOpen, setIsOpen }}>
      <div className="hidden lg:inline">
        <NavItems />
      </div>

      <ButtonBars />
      <MenuBars />
    </NavBarContext.Provider>
  )
}
