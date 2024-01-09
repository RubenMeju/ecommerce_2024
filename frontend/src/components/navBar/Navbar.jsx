'use client'
import { useRef } from 'react'
import MenuItems from './menuItems/MenuItems'
import MenuAccount from './menuAccount/MenuAccount'
import ButtonLogin from './buttonLogin/ButtonLogin'
import { useSession } from 'next-auth/react'
import { IconHuella } from '@/utils/icons'

export default function NavBar() {
  const { data: session } = useSession()
  const sessionRef = useRef(session)

  // Actualizar el ref solo si los datos de sesión cambian
  if (session !== sessionRef.current) {
    sessionRef.current = session
  }

  return (
    <nav className="fixed top-0 left-0 w-full h-20 bg-blue-600">
      <div className="w-[90%] h-full m-auto flex justify-between items-center lg:w-[80%] 2xl:w-[60%]">
        <div className="w-10 h-10 flex items-center">
          <IconHuella />
        </div>
        <MenuItems />

        <div>
          {!sessionRef.current?.user?.access ? (
            <ButtonLogin />
          ) : (
            <MenuAccount />
          )}
        </div>
      </div>
    </nav>
  )
}
