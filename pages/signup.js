import { useToasts } from '@geist-ui/react'
import React, { useContext, useEffect, useState } from 'react'
import { DataContext } from '../store/GlobalState'
import { postData } from '../utils/fetchData'
import valid from '../utils/valid'
import Image from 'next/image'
import { useRouter } from 'next/dist/client/router'

const SignUp = () => {
  const initialState = { name: '', email: '', password: '', cf_password: '' }
  const [userData, setUserData] = useState(initialState)
  const { name, email, password, cf_password } = userData
  const [toasts, setToast] = useToasts()
  const { state, dispatch } = useContext(DataContext)
  const { auth } = state
  const router = useRouter()
  useEffect(() => {
    if (Object.keys(auth).length !== 0) router.push('/')
  }, [router])

  const handleChangeInput = (e) => {
    const { name, value } = e.target
    setUserData({ ...userData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errMsg = valid(name, email, password, cf_password)
    if (errMsg)
      // return dispatch({type:"NOTIFY",payload:{error:errMsg}})
      return setToast({
        text: errMsg,
        type: 'error',
      })

    // return dispatch({type:"NOTIFY",payload:{success:"Ok"}})
    dispatch({ type: 'NOTIFY', payload: { loading: true } })

    const res = await postData('auth/register', userData)

    if (res.err) {
      setToast({
        text: res.err,
        type: 'error',
      })
    }
    dispatch({ type: 'NOTIFY', payload: { loading: false } })

    if (!res.err) {
      setToast({
        text: 'Signing Up is successful',
        type: 'success',
      })
    }
  }
  return (
    <div>
      <section className='max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800 mt-20'>
        <h2 className='text-lg font-semibold text-gray-700 capitalize'>
          Sign Up
        </h2>
        <form onSubmit={handleSubmit}>
          <div className='grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2'>
            <div>
              <label className='text-gray-700 ' htmlFor='username'>
                Username
              </label>
              <input
                name='name'
                value={name}
                onChange={handleChangeInput}
                id='name'
                type='text'
                className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md  focus:border-blue-500  focus:outline-none focus:ring'
              />
            </div>

            <div>
              <label className='text-gray-700 ' htmlFor='emailAddress'>
                Email Address
              </label>
              <input
                name='email'
                value={email}
                onChange={handleChangeInput}
                id='email'
                type='email'
                className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md  focus:border-teal-600  focus:outline-none focus:ring'
              />
            </div>

            <div>
              <label className='text-gray-700 ' htmlFor='password'>
                Password
              </label>
              <input
                name='password'
                value={password}
                onChange={handleChangeInput}
                id='password'
                type='password'
                className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md  focus:border-blue-500  focus:outline-none focus:ring'
              />
            </div>

            <div>
              <label className='text-gray-700 ' htmlFor='passwordConfirmation'>
                Password Confirmation
              </label>
              <input
                name='cf_password'
                value={cf_password}
                onChange={handleChangeInput}
                id='cf_password'
                type='password'
                className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring'
              />
            </div>
          </div>

          <div className='flex justify-end mt-6'>
            <button
              type='submit'
              className='px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-gray-900 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600'
            >
              Sign Up
            </button>
          </div>
        </form>
        <div className='w-full mt-5 '>
          <Image
            alt='signup-image'
            src='/img/hero-pattern.jpg'
            layout='responsive'
            width={700}
            height={500}
          />
        </div>
      </section>
    </div>
  )
}

export default SignUp
