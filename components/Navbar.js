import React, { useState, useContext } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/dist/client/router'
import { DataContext } from '../store/GlobalState'
import Cookies from 'js-cookie'
import { useToasts, Avatar, ButtonDropdown } from '@geist-ui/react'

const Navbar = () => {
  const { state, dispatch } = useContext(DataContext)
  const { auth, cart } = state
  const [toasts, setToast] = useToasts()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const router = useRouter()
  const isActive = (r) => {
    if (r === router.pathname) {
      return 'text-teal-accent-400'
    } else {
      return 'text-gray-100'
    }
  }

  const handleLogout = () => {
    Cookies.remove('refreshtoken', { path: 'api/auth/accessToken' })
    localStorage.removeItem('firstLogin')
    dispatch({ type: 'AUTH', payload: {} })
    setToast({
      text: 'Logged out successfully',
      type: 'success',
    })
    return router.push('/')
  }
  const loggedRouter = () => {
    return (
      <>
        <ul className='flex items-center hidden ml-auto space-x-8 lg:flex'>
          <li className='flex items-center space-x-3'>
            <Avatar src={auth.user.avatar} width='40px' height='40px' />
            <ButtonDropdown type='secondary'>
              <ButtonDropdown.Item main>{auth.user.name}</ButtonDropdown.Item>
              <ButtonDropdown.Item>
                <Link href='/profile'>
                  <a className='w-full'>Your Profile</a>
                </Link>
              </ButtonDropdown.Item>
              {auth.user.role === 'admin' ? (
                <ButtonDropdown.Item>
                  <Link href='/users'>
                    <a className='w-full'>Users</a>
                  </Link>
                </ButtonDropdown.Item>
              ) : null}
              {auth.user.role === 'admin' ? (
                <ButtonDropdown.Item>
                  <Link href='/create'>
                    <a className='w-full'> Add new product</a>
                  </Link>
                </ButtonDropdown.Item>
              ) : null}
              {auth.user.role === 'admin' ? (
                <ButtonDropdown.Item>
                  <Link href='/categories'>
                    <a className='w-full'>Categories</a>
                  </Link>
                </ButtonDropdown.Item>
              ) : null}
              <ButtonDropdown.Item onClick={handleLogout}>Logout</ButtonDropdown.Item>
            </ButtonDropdown>
          </li>
        </ul>
      </>
    )
  }

  return (
    <div>
      <div className='bg-gray-900'>
        <div className='px-4 py-5 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8'>
          <div className='relative flex grid items-center grid-cols-2 lg:grid-cols-3'>
            <ul className='flex items-center hidden space-x-8 lg:flex'>
              <li>
                <Link href='/'>
                  <a
                    aria-label='Our product'
                    title='Our product'
                    className={`font-medium tracking-wide  transition-colors duration-200 hover:text-teal-accent-400 ${isActive(
                      '/'
                    )}`}
                  >
                    Home
                  </a>
                </Link>
              </li>
              <li>
                <Link href='/cart'>
                  <div className='flex items-center space-x-1 cursor-pointer relative'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-6 w-6 text-teal-accent-400'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z'
                      />
                    </svg>

                    <a
                      aria-label='Our product'
                      title='Our product'
                      className={`font-medium tracking-wide transition-colors duration-200 hover:text-teal-accent-400 ${isActive(
                        '/cart'
                      )}`}
                    >
                      Cart
                    </a>
                    <span className='text-teal-accent-400 font-bold '>{cart.length}</span>
                  </div>
                </Link>
              </li>
            </ul>
            <Link href='/'>
              <a aria-label='Company' title='Company' className='inline-flex items-center lg:mx-auto'>
                <svg
                  className='w-8 text-teal-accent-400'
                  viewBox='0 0 24 24'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeMiterlimit='10'
                  stroke='currentColor'
                  fill='none'
                >
                  <rect x='3' y='1' width='7' height='12' />
                  <rect x='3' y='17' width='7' height='6' />
                  <rect x='14' y='1' width='7' height='6' />
                  <rect x='14' y='11' width='7' height='12' />
                </svg>
                <span className='ml-2 text-xl font-bold tracking-wide text-gray-100 uppercase'>Company</span>
              </a>
            </Link>
            {Object.keys(auth).length === 0 ? (
              <ul className='flex items-center hidden ml-auto space-x-8 lg:flex'>
                <li>
                  <Link href='/signin'>
                    <a
                      aria-label='Sign in'
                      title='Sign in'
                      className={`font-medium tracking-wide transition-colors duration-200 hover:text-teal-accent-400 ${isActive(
                        '/signin'
                      )}`}
                    >
                      Sign in
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href='/signup'>
                    <a
                      className='inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none'
                      aria-label='Sign up'
                      title='Sign up'
                    >
                      Sign up
                    </a>
                  </Link>
                </li>
              </ul>
            ) : (
              loggedRouter()
            )}

            <div className='ml-auto lg:hidden'>
              <button
                aria-label='Open Menu'
                title='Open Menu'
                className='p-2 -mr-1 transition duration-200 rounded focus:outline-none focus:shadow-outline'
                onClick={() => setIsMenuOpen(true)}
              >
                <svg className='w-5 text-gray-600' viewBox='0 0 24 24'>
                  <path
                    fill='currentColor'
                    d='M23,13H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,13,23,13z'
                  />
                  <path
                    fill='currentColor'
                    d='M23,6H1C0.4,6,0,5.6,0,5s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,6,23,6z'
                  />
                  <path
                    fill='currentColor'
                    d='M23,20H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,20,23,20z'
                  />
                </svg>
              </button>
              {isMenuOpen && (
                <div className='absolute top-0 left-0 w-full z-20'>
                  <div className='p-5 bg-white border rounded shadow-sm'>
                    <div className='flex items-center justify-between mb-4'>
                      <div>
                        <Link href='/'>
                          <a aria-label='Company' title='Company' className='inline-flex items-center'>
                            <svg
                              className='w-8 text-deep-purple-accent-400'
                              viewBox='0 0 24 24'
                              strokeLinejoin='round'
                              strokeWidth='2'
                              strokeLinecap='round'
                              strokeMiterlimit='10'
                              stroke='currentColor'
                              fill='none'
                            >
                              <rect x='3' y='1' width='7' height='12' />
                              <rect x='3' y='17' width='7' height='6' />
                              <rect x='14' y='1' width='7' height='6' />
                              <rect x='14' y='11' width='7' height='12' />
                            </svg>
                            <span className='ml-2 text-xl font-bold tracking-wide text-gray-800 uppercase'>
                              Company
                            </span>
                          </a>
                        </Link>
                      </div>
                      <div>
                        <button
                          aria-label='Close Menu'
                          title='Close Menu'
                          className='p-2 -mt-2 -mr-2 transition duration-200 rounded hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline'
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <svg className='w-5 text-gray-600' viewBox='0 0 24 24'>
                            <path
                              fill='currentColor'
                              d='M19.7,4.3c-0.4-0.4-1-0.4-1.4,0L12,10.6L5.7,4.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l6.3,6.3l-6.3,6.3 c-0.4,0.4-0.4,1,0,1.4C4.5,19.9,4.7,20,5,20s0.5-0.1,0.7-0.3l6.3-6.3l6.3,6.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3 c0.4-0.4,0.4-1,0-1.4L13.4,12l6.3-6.3C20.1,5.3,20.1,4.7,19.7,4.3z'
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <nav>
                      <ul className='space-y-4'>
                        <li>
                          <Link href='/'>
                            <a
                              aria-label='Our product'
                              title='Our product'
                              className='font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400'
                            >
                              Home
                            </a>
                          </Link>
                        </li>
                        <li>
                          <Link href='/cart'>
                            <a
                              aria-label='Our product'
                              title='Our product'
                              className='font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400'
                            >
                              Cart
                            </a>
                          </Link>
                        </li>

                        {Object.keys(auth).length === 0 ? (
                          <>
                            <li>
                              <Link href='/signin'>
                                <a
                                  aria-label='Sign in'
                                  title='Sign in'
                                  className='font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400'
                                >
                                  Sign in
                                </a>
                              </Link>
                            </li>
                            <li>
                              <Link href='/signup'>
                                <a
                                  className='inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none'
                                  aria-label='Sign up'
                                  title='Sign up'
                                >
                                  Sign up
                                </a>
                              </Link>
                            </li>
                          </>
                        ) : (
                          <>
                            <li>
                              <Link href='/profile'>
                                <a
                                  aria-label='Profile'
                                  title='Profile'
                                  className='font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400'
                                >
                                  Profile
                                </a>
                              </Link>
                            </li>

                            <li>
                              <Link href='/users'>
                                <a
                                  aria-label='Users'
                                  title='Users'
                                  className='font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400'
                                >
                                  Users
                                </a>
                              </Link>
                            </li>
                            <li>
                              <Link href='/categories'>
                                <a
                                  aria-label='Categories'
                                  title='Categories'
                                  className='font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400'
                                >
                                  Categories
                                </a>
                              </Link>
                            </li>
                            <li>
                              <Link href='/create'>
                                <a
                                  aria-label='Categories'
                                  title='Categories'
                                  className='font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400'
                                >
                                  Add new product
                                </a>
                              </Link>
                            </li>
                            <li>
                              <a
                                onClick={handleLogout}
                                aria-label='Logout'
                                title='Logout'
                                className='font-medium tracking-wide  transition-colors duration-200 text-deep-purple-accent-400'
                              >
                                Logout
                              </a>
                            </li>
                          </>
                        )}
                      </ul>
                    </nav>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
