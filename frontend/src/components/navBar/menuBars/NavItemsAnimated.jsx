import { motion } from 'framer-motion'
import { variants } from '../const_nav'
import { NavItems } from '../navItems/NavItems'

export const NavItemsAnimated = ({ isOpen }) => {
  return (
    <motion.div
      initial="closed"
      animate={isOpen ? 'open' : 'closed'}
      variants={variants}
      transition={{ duration: 1 }}
    >
      <NavItems />
    </motion.div>
  )
}
