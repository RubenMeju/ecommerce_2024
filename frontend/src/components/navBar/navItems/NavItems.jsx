import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { pages } from '../const_nav'
import { NavBarContext } from '../menuItems/MenuItems'
import { useContext } from 'react'

export const NavItems = () => {
  const pathname = usePathname()
  const { setIsOpen } = useContext(NavBarContext)

  return (
    <ul className="flex flex-col list-none gap-6 lg:flex-row">
      {pages?.map(({ name, href }) => (
        <li
          key={name}
          className=" text-2xl font-semibold text-white "
          onClick={() => setIsOpen(false)}
        >
          <Link
            href={href}
            className={pathname === href ? 'text-yellow-400' : ''}
          >
            {name}
          </Link>
        </li>
      ))}
    </ul>
  )
}
