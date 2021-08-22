import { Button, Note, Text } from '@geist-ui/react'
import Link from 'next/link'
import React, { useContext, useEffect, useState } from 'react'
import CartInfo from '../components/cart/CartInfo'
import CartItem from '../components/cart/CartItem'
import { DataContext } from '../store/GlobalState'
import { getData, postData } from '../utils/fetchData'

const Cart = () => {
  const { state, dispatch } = useContext(DataContext)
  const { cart, auth } = state

  const [total, setTotal] = useState(0)
  const [shippingState, setShippingState] = useState({
    address: '',
    firstName: '',
    lastName: '',
    mobile: '',
  })

  const onChangeHandler = (e) => {
    const { name, value } = e.target
    setShippingState({ ...shippingState, [name]: value })
  }

  const handlePayment = async () => {
    // dispatch({ type: 'NOTIFY', loading: true })
    postData('order', { shippingState, cart, total }, auth.token).then(
      (res) => {
        if (res.err)
          return dispatch({ type: 'NOTIFY', payload: { error: res.err } })

        dispatch({ type: 'ADD_CART', payload: [] })
        return dispatch({ type: 'NOTIFY', payload: { success: res.msg } })
      }
    )
  }

  useEffect(() => {
    const getTotal = () => {
      const res = cart.reduce((prev, item) => {
        return prev + item.price * item.quantity
      }, 0)
      setTotal(res)
    }

    getTotal()
  }, [cart])

  useEffect(() => {
    const cartLocal = JSON.parse(localStorage.getItem('__next__cart01__temel'))
    if (cartLocal && cartLocal.length > 0) {
      let newArr = []
      const updateCart = async () => {
        for (const item of cartLocal) {
          const res = await getData(`product/${item._id}`)
          const { _id, title, images, price, inStock, sold } = res.product
          if (inStock > 0) {
            newArr.push({
              _id,
              title,
              images,
              price,
              inStock,
              sold,
              quantity: item.quantity > inStock ? 1 : item.quantity,
            })
          }
        }
        dispatch({ type: 'ADD_CART', payload: newArr })
      }
      updateCart()
    }
  }, [])
  return (
    <div className='flex flex-col max-w-5xl mx-auto p-6 space-y-4 sm:p-10 bg-coolGray-50 text-coolGray-800'>
      <h2 className='text-xl font-semibold'>Your cart</h2>

      {
        <>
          {cart.length === 0 ? (
            <div>
              <Note filled>Your cart is empty.Please add products</Note>
            </div>
          ) : (
            <>
              <ul className='flex flex-col divide-y divide-coolGray-300'>
                {cart.map((item) => (
                  <CartItem
                    key={item._id}
                    item={item}
                    dispatch={dispatch}
                    cart={cart}
                  />
                ))}
              </ul>

              <CartInfo
                shippingState={shippingState}
                onChangeHandler={onChangeHandler}
              />
              <div className='space-y-1 text-right'>
                <p>
                  Total amount:
                  <span className='font-semibold'> {total}$ </span>
                </p>
                <Text>Not including taxes and shipping costs</Text>
              </div>
              <div className='flex flex-wrap justify-end space-x-4'>
                <Link href='/'>
                  <a>
                    <Button width='100%' type='secondary'>
                      Back{' '}
                      <span className='sr-only sm:not-sr-only'> to shop</span>
                    </Button>
                  </a>
                </Link>
                <Link href={auth.user ? '#' : '/signin'}>
                  <a>
                    <Button width='50%' onClick={handlePayment}>
                      <span className='sr-only sm:not-sr-only'>
                        Continue to
                      </span>{' '}
                      Checkout
                    </Button>
                  </a>
                </Link>
              </div>
            </>
          )}
        </>
      }
    </div>
  )
}

export default Cart
