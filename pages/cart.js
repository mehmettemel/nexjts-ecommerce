import { Button, Note, Text } from '@geist-ui/react'
import { route } from 'next/dist/server/router'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react'
import CartInfo from '../components/cart/CartInfo'
import CartItem from '../components/cart/CartItem'
import { DataContext } from '../store/GlobalState'
import { getData, postData } from '../utils/fetchData'

const Cart = () => {
  const { state, dispatch } = useContext(DataContext)
  const { cart, auth, orders } = state
  const router = useRouter()
  const [total, setTotal] = useState(0)
  const [callback, setCallback] = useState(false)
  const [shippingState, setShippingState] = useState({
    address: '',
    firstName: '',
    lastName: '',
    mobile: '',
  })
  const { address, firstName, lastName, mobile } = shippingState

  const onChangeHandler = (e) => {
    const { name, value } = e.target
    setShippingState({ ...shippingState, [name]: value })
  }

  const handlePayment = async () => {
    if (!auth.user) return router.push('/signin')
    if (!address || !firstName || !lastName || !mobile) {
      return dispatch({
        type: 'NOTIFY',
        payload: { error: 'You should fill all the fields' },
      })
    }
    let newCart = []
    for (const item of cart) {
      const res = await getData(`product/${item._id}`)
      if (res.product.inStock - item.quantity >= 0) {
        newCart.push(item)
      }
    }
    if (newCart.length < cart.length) {
      setCallback(!callback)
      return dispatch({
        type: 'NOTIFY',
        payload: {
          error: 'The product is out of stock or the quantity is insufficent',
        },
      })
    }
    dispatch({
      type: 'NOTIFY',
      payload: {
        loading: true,
      },
    })
    postData('order', { shippingState, cart, total }, auth.token).then(
      (res) => {
        if (res.err)
          return dispatch({ type: 'NOTIFY', payload: { error: res.err } })
        const newOrder = {
          ...res.newOrder,
          user: auth.user,
        }
        dispatch({ type: 'ADD_CART', payload: [] })
        dispatch({ type: 'ADD_ORDERS', payload: [...orders, newOrder] })
        dispatch({ type: 'NOTIFY', payload: { success: res.msg } })
        return router.push(`/order/${res.newOrder._id}`)
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
            <Note filled>Your cart is empty.Please add products</Note>
          ) : (
            <>
              <ul className='flex flex-col divide-y divide-coolGray-300'>
                {cart.map((item) => (
                  <CartItem key={item._id} item={item} cart={cart} />
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
                      Back to shop
                    </Button>
                  </a>
                </Link>
                <Link href={auth.user ? '#' : '/signin'}>
                  <a>
                    <Button width='50%' onClick={handlePayment}>
                      <span className='sr-only sm:not-sr-only'>
                        Give your Order
                      </span>
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
