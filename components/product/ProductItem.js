import {
  Button,
  Card,
  Divider,
  Link as GeistLink,
  Note,
  Text,
} from '@geist-ui/react'
import React, { useContext } from 'react'
import Link from 'next/link'
import { DataContext } from '../../store/GlobalState'
import { addToCart } from '../../store/Actions'

const ProductItem = ({ product }) => {
  const { state, dispatch } = useContext(DataContext)
  const { cart } = state

  const handleAddToCart = () => {
    dispatch({
      type: 'NOTIFY',
      payload: { success: 'Product is added to cart' },
    })
    dispatch(addToCart(product, cart))
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
      <Card.Footer>{userLink()}</Card.Footer>
    </Card>
  )
}

export default ProductItem
