import { Avatar, Button, Modal, Table } from '@geist-ui/react'
import Link from 'next/link'
import React, { useContext, useState } from 'react'
import { DataContext } from '../store/GlobalState'
import Check from '@geist-ui/react-icons/check'
import { X } from '@geist-ui/react-icons'
import { deleteData } from '../utils/fetchData'
import router from 'next/router'
const Users = () => {
  const { state, dispatch } = useContext(DataContext)
  const { users, auth, modal } = state
  const [modalState, setModalState] = useState(false)
  // const handler = () => {
  //   dispatch({
  //     type: 'ADD_MODAL',
  //     payload: {
  //       data: users,
  //       id: item._id,
  //       title: item.title,
  //       type: 'ADD_USERS',
  //     },
  //   })
  //   setModalState(true)
  // }
  const closeHandler = (event) => {
    setModalState(false)
  }
  const handleSubmit = () => {
    deleteData(`user/${modal.id}`, auth.token).then((res) => {
      if (res.err)
        return dispatch({
          type: 'NOTIFY',
          payload: { error: res.err },
        })
      dispatch({
        type: 'NOTIFY',
        payload: { success: res.msg },
      })
      dispatch({ type: 'ADD_MODAL', payload: {} })
      setModalState(false)
    })
  }
  const dataSource = users.map((user) => ({
    id: user._id,
    avatar: <Avatar src={user.avatar} />,
    name: user.name,
    email: user.email,
    admin: user.role === 'admin' ? <Check /> : <X />,
    edit: (
      <Link href={user.role === 'admin' ? `/edit_user/${user._id}` : '#!'}>
        <a>
          <Button type='warning' auto scale={1 / 2}>
            Edit
          </Button>
        </a>
      </Link>
    ),
    delete: (
      <>
        <Button
          onClick={() => {
            dispatch({
              type: 'ADD_MODAL',
              payload: {
                data: users,
                id: user._id,
                title: user.name,
                type: 'ADD_USERS',
              },
            })
            setModalState(true)
          }}
          type='error'
          auto
          scale={1 / 2}
        >
          <a> Delete</a>
        </Button>
        <Modal visible={modalState} onClose={closeHandler}>
          <Modal.Content>
            <p>Are you sure to remove {user.name}?</p>
          </Modal.Content>
          <Modal.Action passive onClick={() => setModalState(false)}>
            Cancel
          </Modal.Action>
          <Modal.Action onClick={handleSubmit}>Delete</Modal.Action>
        </Modal>
      </>
    ),
  }))
  if (!auth.user) return null
  return (
    <div className='py-5'>
      <h2 className='text-lg md:text-2xl'>Users</h2>
      <div className='my-2 overflow-x-auto'>
        <Table data={dataSource} onChange={(value) => setData(value)}>
          <Table.Column prop='id' label='id' />
          <Table.Column prop='avatar' label='avatar' />
          <Table.Column prop='name' label='name' />
          <Table.Column prop='email' label='email' />
          <Table.Column prop='admin' label='admin' />
          <Table.Column prop='edit' label='edit'></Table.Column>
          <Table.Column prop='delete' label='delete'></Table.Column>
        </Table>
      </div>
    </div>
  )
}

export default Users
