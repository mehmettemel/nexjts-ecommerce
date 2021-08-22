import { Button } from '@geist-ui/react'
import React from 'react'

const ProfileEdit = ({
  auth,
  data,
  handleChange,
  handleUpdate,
  handleAvatar,
}) => {
  const { name, email, password, cf_password, avatar } = data
  return (
    <form className='container flex flex-col mx-auto space-y-12 ng-untouched ng-pristine ng-valid'>
      <fieldset className='grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm bg-coolGray-50'>
        <div className='space-y-2 col-span-full lg:col-span-1'>
          <p className='font-medium'>Edit Your Profile</p>
          <p className='text-xs'>You can edit your profile</p>
        </div>
        <div className='grid grid-cols-6 gap-4 col-span-full lg:col-span-3'>
          <div className='col-span-full sm:col-span-3'>
            <label htmlFor='username' className='text-sm'>
              Name
            </label>
            <input
              onChange={handleChange}
              defaultValue={auth.user.name}
              value={name}
              id='name'
              name='name'
              type='text'
              placeholder='Your name'
              className='vercel-button'
            />
          </div>
          <div className='col-span-full sm:col-span-3'>
            <label htmlFor='website' className='text-sm'>
              Email
            </label>
            <input
              onChange={handleChange}
              defaultValue={auth.user.email}
              value={email}
              id='email'
              name='email'
              type='email'
              placeholder='Your email address'
              className='vercel-button'
            />
          </div>
          <div className='col-span-full sm:col-span-3'>
            <label htmlFor='website' className='text-sm'>
              Password
            </label>
            <input
              onChange={handleChange}
              value={password}
              id='password'
              name='password'
              type='password'
              placeholder='Password'
              className='vercel-button'
            />
          </div>
          <div className='col-span-full sm:col-span-3'>
            <label htmlFor='website' className='text-sm'>
              Confirm Password
            </label>
            <input
              onChange={handleChange}
              value={cf_password}
              id='cf_password'
              name='cf_password'
              type='password'
              placeholder='Write your password again'
              className='vercel-button'
            />
          </div>

          <div className='col-span-full'>
            <label htmlFor='bio' className='text-sm'>
              Photo
            </label>
            <div className='flex items-center space-x-2'>
              <img
                src={avatar ? URL.createObjectURL(avatar) : auth.user.avatar}
                alt={auth.user.name}
                className='w-10 h-10 rounded-full bg-coolGray-300'
              />

              <input
                accept='image/*'
                type='file'
                name='avatar'
                id='avatar'
                onChange={handleAvatar}
              />
            </div>
          </div>
          <div className='col-span-full mt-2'>
            <Button type='secondary' onClick={handleUpdate}>
              Update
            </Button>
          </div>
        </div>
      </fieldset>
    </form>
  )
}

export default ProfileEdit
