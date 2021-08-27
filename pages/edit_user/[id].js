import { Button, Checkbox } from '@geist-ui/react'
import { useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react'
import { updateItem } from '../../store/Actions'
import { DataContext } from '../../store/GlobalState'
import { patchData } from '../../utils/fetchData'
import SearchEngineOptimization from '../../components/SearchEngineOptimization'
const EditUser = () => {
  const { state, dispatch } = useContext(DataContext)
  const router = useRouter()
  const { id } = router.query
  const { auth, users, notify } = state
  const [editUser, setEditUser] = useState([])
  const [checkAdmin, setCheckAdmin] = useState(false)
  const handleSubmit = () => {
    let role = checkAdmin ? 'admin' : 'user'
    dispatch({ type: 'NOTIFY', payload: { loading: true } })
    patchData(`user/${editUser._id}`, { role }, auth.token).then((res) => {
      if (res.err)
        return dispatch({ type: 'NOTIFY', payload: { error: res.err } })

      dispatch(
        updateItem(users, editUser._id, { ...editUser, role }, 'ADD_USERS')
      )
      return dispatch({
        type: 'NOTIFY',
        payload: { success: res.msg },
      })
    })
    dispatch({ type: 'NOTIFY', payload: { loading: true } })
  }
  useEffect(() => {
    users.forEach((user) => {
      if (user._id === id) {
        setEditUser(user)
        setCheckAdmin(user.role === 'admin' ? true : false)
      }
    })
  }, [users])
  return (
    <>
      <SearchEngineOptimization title='Edit User' />
      <section className='max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800'>
        <div className='flex items-center space-x-3'>
          <Button onClick={() => router.back()} type='secondary'>
            Go back
          </Button>
          <h2 className='text-lg font-semibold text-gray-700 capitalize dark:text-white'>
            Edit User
          </h2>
        </div>

        <htmlForm>
          <div className='grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2'>
            <div>
              <label
                className='text-gray-700 dark:text-gray-200'
                htmlFor='name'
              >
                Name
              </label>
              <input
                id='name'
                defaultValue={editUser.name}
                type='text'
                className='vercel-button'
              />
            </div>

            <div>
              <label
                className='text-gray-700 dark:text-gray-200'
                htmlFor='email'
              >
                Email Address
              </label>
              <input
                defaultValue={editUser.email}
                id='email'
                type='email'
                className='vercel-button'
              />
            </div>

            <div>
              <Checkbox
                scale={1.25}
                checked={checkAdmin}
                onChange={() => setCheckAdmin(!checkAdmin)}
              >
                isAdmin
              </Checkbox>
            </div>
          </div>

          <div className='flex justify-end mt-6'>
            <Button
              loading={notify.loading}
              onClick={handleSubmit}
              type='secondary'
            >
              Update
            </Button>
          </div>
        </htmlForm>
      </section>
    </>
  )
}

export default EditUser
