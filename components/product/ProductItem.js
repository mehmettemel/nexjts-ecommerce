import { Button, Card, Divider, Link as GeistLink, Modal, Note, Text } from '@geist-ui/react'
import React, { useContext, useState } from 'react'
import Link from 'next/link'
import { DataContext } from '../../store/GlobalState'
import { addToCart } from '../../store/Actions'
import { deleteData } from '../../utils/fetchData'
import { useRouter } from 'next/dist/client/router'

const ProductItem = ({ product }) => {
  const { state, dispatch } = useContext(DataContext)
  const { cart, auth, modal } = state
  const [modalState, setModalState] = useState(false)
  const router = useRouter()
  const handler = () => {
    dispatch({
      type: 'ADD_MODAL',
      payload: [
        {
          data: '',
          id: product._id,
          title: product.title,
          type: '',
        },
      ],
    })
    setModalState(true)
  }
  const closeHandler = (event) => {
    setModalState(false)
  }
  const handleSubmit = () => {
    deleteData(`product/${modal[0].id}`, auth.token).then((res) => {
      if (res.err) return dispatch({ type: 'NOTIFY', payload: { error: res.err } })
      setModalState(false)
      router.reload()
      return dispatch({ type: 'NOTIFY', payload: { success: res.msg } })
    })
  }
  const handleAddToCart = () => {
    dispatch({
      type: 'NOTIFY',
      payload: { success: 'Product is added to cart' },
    })
    dispatch(addToCart(product, cart))
  }
  const adminLink = () => {
    return (
      <>
        <GeistLink block>
          <Link href={`create/${product._id}`}>
            <a>Edit</a>
          </Link>
        </GeistLink>
        <Button type='error' width='50%' onClick={handler}>
          Delete
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
      </>
    )
  }
  const userLink = () => {
    return (
      <>
        <GeistLink block>
          <Link href={`product/${product._id}`}>
            <a>View</a>
          </Link>
        </GeistLink>
        <Button
          type='secondary'
          width='50%'
          onClick={handleAddToCart}
          disabled={product.inStock === 0 ? true : false}
        >
          Buy
        </Button>
      </>
    )
  }
  return (
    <Card>
      <img
        className='object-cover w-full h-64 rounded'
        src={product.images[0].url}
        alt={product.images[0].url}
      />
      <Text h4 mb={0}>
        {product.title}
      </Text>
      <Divider />
      <Text type='secondary' small>
        {product.description}
      </Text>
      <br />
      <Text type='success' font='1rem' h4 mt={2}>
        ${product.price}
      </Text>
      <Text mt={2}>
        {product.inStock > 0 ? (
          <Note filled>In Stock: {product.inStock}</Note>
        ) : (
          <Note filled>Out Stock</Note>
        )}
      </Text>
      <Card.Footer>{!auth.user || auth.user.role !== 'admin' ? userLink() : adminLink()}</Card.Footer>
    </Card>
  )
}

export default ProductItem
