import { useToasts } from '@geist-ui/react'
import React, { useContext, useEffect, useState } from 'react'
import { Fragment } from 'react'
import ProfileAvatar from '../components/profile/ProfileAvatar'
import ProfileEdit from '../components/profile/ProfileEdit'
import ProfileOrders from '../components/profile/ProfileOrders'
import SearchEngineOptimization from '../components/SearchEngineOptimization'
import { DataContext } from '../store/GlobalState'
import { patchData } from '../utils/fetchData'
import { imageUpload } from '../utils/imageUpload'
import valid from '../utils/valid'

const Profile = () => {
  const { state, dispatch } = useContext(DataContext)
  const [toasts, setToast] = useToasts()
  const { auth } = state
  const initialState = {
    avatar: '',
    name: '',
    password: '',
    cf_password: '',
  }
  const [data, setData] = useState(initialState)
  const { name, avatar, password, cf_password } = data
  useEffect(() => {
    if (auth.user) {
      setData({ ...data, name: auth.user.name })
    }
  }, [auth.user])
  const handleChange = (e) => {
    const { name, value } = e.target
    setData({ ...data, [name]: value })
    dispatch({ type: 'NOTIFY', payload: {} })
  }
  const handleAvatar = (e) => {
    const file = e.target.files[0]
    if (!file)
      return setToast({
        text: 'File does not exists',
        type: 'error',
      })
    if (file.size > 1024 * 1024)
      //1mb
      return setToast({
        text: 'File size cannot be 1MB or larger',
        type: 'error',
      })
    if (file.type !== 'image/jpeg' && file.type !== 'image/png')
      return setToast({
        text: 'Image format should be jpeg or png',
        type: 'error',
      })
    setData({ ...data, avatar: file })
  }
  const handleUpdate = (e) => {
    e.preventDefault()
    if (password) {
      const errMsg = valid(name, auth.user.email, password, cf_password)
      if (errMsg)
        return setToast({
          text: errMsg,
          type: 'error',
        })

      updatePassword()
    }
    if (name !== auth.user.name || avatar) updateInformation()
  }

  const updateInformation = async () => {
    let media
    if (avatar) media = await imageUpload([avatar])
    patchData(
      'user',
      {
        name,
        avatar: avatar ? media[0].url : auth.user.avatar,
      },
      auth.token
    ).then((res) => {
      if (res.err)
        return setToast({
          text: res.err,
          type: 'error',
        })
      dispatch({
        type: 'AUTH',
        payload: {
          token: auth.token,
          user: res.user,
        },
      })
      return setToast({
        text: res.msg,
        type: 'success',
      })
    })
  }

  const updatePassword = () => {
    dispatch({ type: 'NOTIFY', payload: { loading: true } })
    patchData('user/resetPassword', { password }, auth.token).then((res) => {
      if (res.err)
        return setToast({
          text: res.err,
          type: 'error',
        })

      return setToast({
        text: res.msg,
        type: 'success',
      })
    })
  }

  if (!auth.user) return null
  return (
    <Fragment>
      <SearchEngineOptimization title='Profile Page' />
      <section className='grid grid-cols lg:grid-cols-2 gap-3 px-5 py-10'>
        <div>
          <ProfileAvatar auth={auth} />
          <ProfileEdit
            auth={auth}
            data={data}
            handleChange={handleChange}
            handleUpdate={handleUpdate}
            handleAvatar={handleAvatar}
          />
        </div>
        <ProfileOrders />
      </section>
    </Fragment>
  )
}

export default Profile
