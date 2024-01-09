import { motion } from 'framer-motion'
import { variants } from '../const_nav'
import { NavItemsAnimated } from './NavItemsAnimated'
import { useContext } from 'react'
import { NavBarContext } from '../menuItems/MenuItems'

export const MenuBars = () => {
  const { isOpen } = useContext(NavBarContext)
  return (
    <motion.div
      initial="closed"
      animate={isOpen ? 'open' : 'closed'}
      variants={variants}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gradient-to-r from-blue-700 to-blue-900 z-40"
    >
      <NavItemsAnimated isOpen={isOpen} />
    </motion.div>
  )
}
