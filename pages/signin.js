import React, { useContext, useEffect, useState } from 'react'
import SearchEngineOptimization from '../components/SearchEngineOptimization'
import Link from 'next/link'
import { Button, useToasts } from '@geist-ui/react'
import { DataContext } from '../store/GlobalState'
import Cookies from 'js-cookie'
import { postData } from '../utils/fetchData'
import { useRouter } from 'next/dist/client/router'
const SignIn = () => {
  const initialState = { email: '', password: '' }
  const [userData, setUserData] = useState(initialState)
  const { email, password } = userData
  const [toasts, setToast] = useToasts()
  const { state, dispatch } = useContext(DataContext)
  const { auth, notify } = state
  const router = useRouter()

  const handleChangeInput = (e) => {
    const { name, value } = e.target
    setUserData({ ...userData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    dispatch({ type: 'NOTIFY', payload: { loading: true } })

    const res = await postData('auth/login', userData)
    dispatch({ type: 'NOTIFY', payload: { loading: false } })
    if (res.err)
      return setToast({
        text: res.err,
        type: 'error',
      })

    dispatch({
      type: 'AUTH',
      payload: { token: res.access_token, user: res.user },
    })

    if (!res.err) {
      setToast({
        text: 'Login is successful',
        type: 'success',
      })
    }
    // Create an expiring cookie, valid to the path of the current page:
    // Cookies.set('name', 'value', { expires: 7, path: '' })
    Cookies.set('refreshToken', res.refresh_token, {
      path: 'api/auth/accessToken',
      expires: 7,
    })
    localStorage.setItem('firstLogin', true)
  }

  useEffect(() => {
    if (Object.keys(auth).length !== 0) router.push('/')
  }, [auth, router])
  return (
    <>
      <SearchEngineOptimization title='Sign In Page' />

      <div className='flex max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 lg:max-w-4xl mt-10'>
        <div className='bg-gradient-to-r from-gray-100 via-gray-200 to-gray-400 hidden bg-cover lg:block lg:w-1/2 '></div>

        <div className='w-full px-6 py-8 md:px-8 lg:w-1/2 bg-gray-100'>
          <h2 className='text-2xl font-semibold text-center text-gray-900 dark:text-white'>
            Temel E-commerce
          </h2>

          <p className='text-xl text-center text-gray-600 dark:text-gray-200'>Welcome back!</p>

          <div className='mt-4'>
            <label
              className='block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200'
              htmlFor='LoggingEmailAddress'
            >
              Email Address
            </label>
            <input
              name='email'
              value={email}
              onChange={handleChangeInput}
              id='email'
              type='email'
              className='vercel-button'
            />
          </div>

          <div className='mt-4'>
            <div className='flex justify-between'>
              <label
                className='block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200'
                htmlFor='loggingPassword'
              >
                Password
              </label>
              <a href='#' className='text-xs text-gray-500 dark:text-gray-300 hover:underline'>
                Forget Password?
              </a>
            </div>

            <input
              name='password'
              value={password}
              onChange={handleChangeInput}
              id='password'
              type='password'
              className='vercel-button'
            />
          </div>

          <div className='mt-8'>
            <Button
              loading={notify.loading}
              onClick={handleSubmit}
              type='secondary'
              htmlType='submit'
              width='100%'
            >
              Login
            </Button>
          </div>

          <div className='flex items-center justify-between mt-4'>
            <span className='w-1/5 border-b border-teal-accent-400 md:w-1/4'></span>
            <Link href='/signup'>
              <a className='text-xs text-gray-500 uppercase dark:text-gray-400 hover:underline'>or sign up</a>
            </Link>

            <span className='w-1/5 border-b border-teal-accent-400 md:w-1/4'></span>
          </div>
        </div>
      </div>
    </>
  )
}

export default SignIn
