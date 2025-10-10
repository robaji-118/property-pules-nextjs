'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import logo from '@/assets/images/logo-white.png'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import profileDefault from '@/assets/images/profile.png'
import { FaGithub } from 'react-icons/fa'
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'
import UnreadMessageCount from './UnreadMessageCount'

const Navbar = () => {
  const { data: session } = useSession()
  const profileImage = session?.user?.image || profileDefault.src

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)
  const [providers, setProviders] = useState(null)
  const pathname = usePathname()

  useEffect(() => {
    const setAuthProviders = async () => {
      const res = await getProviders()
      setProviders(res)
    }
    setAuthProviders()
  }, [])

  // Auto close mobile menu when navigating
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  return (
    <nav className='bg-blue-700 border-b border-blue-500'>
      <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
        <div className='relative flex h-20 items-center justify-between'>

          {/* Mobile toggle */}
          <div className='absolute inset-y-0 left-0 flex items-center md:hidden'>
            <button
              type='button'
              id='mobile-dropdown-button'
              className='relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white'
              onClick={() => setIsMobileMenuOpen(prev => !prev)}
            >
              <svg
                className='h-6 w-6'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5'
                />
              </svg>
            </button>
          </div>

          {/* Logo + Menu */}
          <div className='flex flex-1 items-center justify-center md:items-stretch md:justify-start'>
            <Link href='/' className='flex items-center'>
              <Image src={logo} alt='PropertyPulse' width={120} height={40} />
              <span className='hidden md:block text-white text-2xl font-bold ml-2'>
                PropertyPulse
              </span>
            </Link>

            <div className='hidden md:ml-6 md:block'>
              <div className='flex space-x-2'>
                <Link href='/' className={`${pathname === '/' ? 'bg-black' : ''} text-white hover:bg-gray-900 rounded-md px-3 py-2`}>
                  Home
                </Link>
                <Link href='/properties' className={`${pathname === '/properties' ? 'bg-black' : ''} text-white hover:bg-gray-900 rounded-md px-3 py-2`}>
                  Properties
                </Link>
                {session && (
                  <Link href='/properties/add' className={`${pathname === '/properties/add' ? 'bg-black' : ''} text-white hover:bg-gray-900 rounded-md px-3 py-2`}>
                    Add Property
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* Right Section */}
          {!session ? (
            <div className='hidden md:block md:ml-6'>
              <div className='flex items-center'>
                {providers && Object.values(providers).map(provider => (
                  <button
                    key={provider.name}
                    onClick={() => signIn(provider.id)}
                    className='flex items-center text-white bg-gray-700 hover:bg-gray-900 rounded-md px-3 py-2'
                  >
                    <FaGithub className='mr-2' />
                    <span>Login or Register</span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className='absolute inset-y-0 right-0 flex items-center pr-2 md:static md:inset-auto md:ml-6 md:pr-0'>
              <Link href='/messages' className='relative group'>
                <button className='relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white'>
                  <svg
                    className='h-6 w-6'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth='1.5'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0'
                    />
                  </svg>
                </button>
                <UnreadMessageCount />
              </Link>

              {/* Profile dropdown */}
              <div className='relative ml-3'>
                <button
                  onClick={() => setIsProfileMenuOpen(prev => !prev)}
                  className='flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white'
                >
                  <Image src={profileImage} width={40} height={40} alt='User profile' className='rounded-full' />
                </button>

                {isProfileMenuOpen && (
                  <div className='absolute right-0 z-10 mt-2 w-48 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5'>
                    <Link href='/profile' className='block px-4 py-2 text-sm text-gray-700' onClick={() => setIsProfileMenuOpen(false)}>
                      Your Profile
                    </Link>
                    <Link href='/properties/saved' className='block px-4 py-2 text-sm text-gray-700'>
                      Saved Properties
                    </Link>
                    <button
                      onClick={() => {
                        setIsProfileMenuOpen(false)
                        signOut()
                      }}
                      className='block w-full text-left px-4 py-2 text-sm text-gray-700'
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div id='mobile-menu'>
          <div className='space-y-1 px-2 pb-3 pt-2'>
            <Link href='/' className={`${pathname === '/' ? 'bg-black' : ''} text-white block rounded-md px-3 py-2 text-base`}>
              Home
            </Link>
            <Link href='/properties' className={`${pathname === '/properties' ? 'bg-black' : ''} text-white block rounded-md px-3 py-2 text-base`}>
              Properties
            </Link>
            {session && (
              <Link href='/properties/add' className={`${pathname === '/properties/add' ? 'bg-black' : ''} text-white block rounded-md px-3 py-2 text-base`}>
                Add Property
              </Link>
            )}
            {!session && providers && Object.values(providers).map(provider => (
              <button
                key={provider.name}
                onClick={() => signIn(provider.id)}
                className='flex items-center text-white bg-gray-700 hover:bg-gray-900 rounded-md px-3 py-2 my-5'
              >
                <FaGithub className='mr-2' />
                <span>Login or Register</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
