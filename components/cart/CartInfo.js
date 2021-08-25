import React from 'react'

const CartInfo = ({ shippingState, onChangeHandler }) => {
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
              onChange={onChangeHandler}
              value={shippingState.firstName}
              id='firstname'
              name='firstName'
              type='text'
              placeholder='First Name'
              className='vercel-button'
            />
          </div>
          <div className=' col-span-full sm:col-span-3'>
            <label htmlFor='lastname' className='text-sm'>
              Last name
            </label>
            <input
              onChange={onChangeHandler}
              value={shippingState.lastName}
              id='lastname'
              name='lastName'
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
              onChange={onChangeHandler}
              value={shippingState.mobile}
              name='mobile'
              id='mobile'
              type='tel'
              placeholder='Your mobile number'
              className='vercel-button'
            />
          </div>
          <div className='col-span-full'>
            <label htmlFor='address' className='text-sm'>
              Address
            </label>
            <input
              onChange={onChangeHandler}
              value={shippingState.address}
              name='address'
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
