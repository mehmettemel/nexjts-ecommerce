import React, { useContext, useState } from 'react'
import Link from 'next/link'
import { Minus } from '@geist-ui/react-icons'
import { Plus } from '@geist-ui/react-icons'
import { Button, Modal } from '@geist-ui/react'
import { decrease, deleteItem, increase } from '../../store/Actions'
import { Trash } from '@geist-ui/react-icons'
import { DataContext } from '../../store/GlobalState'

const CartItem = ({ item, cart }) => {
  const { state, dispatch } = useContext(DataContext)
  const { modal } = state
  const [modalState, setModalState] = useState(false)
  const handler = () => {
    dispatch({
      type: 'ADD_MODAL',
      payload: {
        data: cart,
        id: item._id,
        title: item.title,
        type: 'ADD_CART',
      },
    })
    setModalState(true)
  }
  const closeHandler = (event) => {
    setModalState(false)
  }
  const handleSubmit = () => {
    dispatch(deleteItem(modal.data, modal.id, 'ADD_CART'))
    dispatch({ type: 'ADD_MODAL', payload: {} })
  }
  return (
    <li className='flex flex-col py-6 sm:flex-row sm:justify-between'>
      <div className='flex w-full space-x-2 sm:space-x-4'>
        <img
          className='flex-shrink-0 object-cover w-20 h-32 border-transparent rounded outline-none sm:w-32 sm:h-full'
          src={item.images[0].url}
          alt={item.images[0].url}
        />
        <div className='flex flex-col justify-between w-full pb-4'>
          <div className='flex justify-between w-full pb-2 space-x-2'>
            <div className='space-y-1'>
              <Link href={`/product/${item._id}`}>
                <a className=' text-lg font-semibold leading-snug sm:pr-8 cursor-pointer'>
                  {item.title}
                </a>
              </Link>

              {item.inStock > 0 ? (
                <p className='text-sm text-coolGray-600'>
                  In Stock: {item.inStock}{' '}
                </p>
              ) : (
                <p className='text-sm text-coolGray-600'>Out of Stock</p>
              )}
            </div>
            <div className='text-right'>
              <p className='text-lg font-semibold'>{item.price}$</p>
              <p className='text-sm  text-coolGray-400'>
                Quantity: {item.quantity}
              </p>
              <div className='mt-2 flex items-center'>
                <Button
                  onClick={() => dispatch(decrease(cart, item._id))}
                  iconRight={<Minus />}
                  auto
                  disabled={item.quantity === 1 ? true : false}
                  scale={2 / 3}
                />
                <span className='mx-2'>{item.quantity}</span>
                <Button
                  disabled={item.quantity === item.inStock ? true : false}
                  onClick={() => dispatch(increase(cart, item._id))}
                  iconRight={<Plus />}
                  auto
                  scale={2 / 3}
                />
              </div>
            </div>
          </div>
          <div className='flex  text-sm divide-x'>
            <Button onClick={handler} icon={<Trash />}>
              Remove
            </Button>
            <Modal visible={modalState} onClose={closeHandler}>
              <Modal.Title>{modal.title}</Modal.Title>
              <Modal.Subtitle>Temel E-commerce</Modal.Subtitle>
              <Modal.Content>
                <p>Are you sure to remove {modal.title}?</p>
              </Modal.Content>
              <Modal.Action passive onClick={() => setModalState(false)}>
                Cancel
              </Modal.Action>
              <Modal.Action onClick={handleSubmit}>Sure</Modal.Action>
            </Modal>
          </div>
        </div>
      </div>
    </li>
  )
}

export default CartItem
