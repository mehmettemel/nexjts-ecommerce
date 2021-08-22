import React, { useState } from 'react'

const CartInfo = () => {
  const [address, setAddress] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [mobile, setMobile] = useState('')
  return (
    <form
      noValidate=''
      action=''
      className='container flex flex-col mx-auto space-y-12 ng-untouched ng-pristine ng-valid'
    >
      <fieldset className='grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm bg-coolGray-50'>
        <div className='space-y-2 col-span-full lg:col-span-1'>
          <p className='font-medium'>Shipping Information</p>
          <p className='text-xs'>Please fill all information inputs</p>
        </div>
        <div className='grid grid-cols-6 gap-4 col-span-full lg:col-span-3'>
          <div className=' col-span-full sm:col-span-3'>
            <label htmlFor='firstname' className='text-sm'>
              First name
            </label>
            <input
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
              id='firstname'
              type='text'
              placeholder='Last name'
              className='vercel-button'
            />
          </div>
          <div className=' col-span-full sm:col-span-3'>
            <label htmlFor='lastname' className='text-sm'>
              Last name
            </label>
            <input
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
              id='lastname'
              type='text'
              placeholder='Last name'
              className='vercel-button'
            />
          </div>
          <div className='col-span-full sm:col-span-3'>
            <label htmlFor='mobile' className='text-sm'>
              Mobile Number
            </label>
            <input
              onChange={(e) => setMobile(e.target.value)}
              value={mobile}
              id='mobile'
              type='mobile'
              placeholder='Your mobile number'
              className='vercel-button'
            />
          </div>
          <div className='col-span-full'>
            <label htmlFor='address' className='text-sm'>
              Address
            </label>
            <input
              onChange={(e) => setAddress(e.target.value)}
              value={address}
              id='address'
              type='text'
              placeholder=''
              className='vercel-button'
            />
          </div>
        </div>
      </fieldset>
    </form>
  )
}

export default CartInfo
