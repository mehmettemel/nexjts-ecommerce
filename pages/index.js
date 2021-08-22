import { Note } from '@geist-ui/react'
import { useState } from 'react'
import ProductItem from '../components/product/ProductItem'
import SearchEngineOptimization from '../components/SearchEngineOptimization'
import { getData } from '../utils/fetchData'

export default function Home(props) {
  const [products, setProducts] = useState(props.products)
  return (
    <>
      <SearchEngineOptimization title='Temel E-commerce' />

      {products.length === 0 ? (
        <div className='w-full'>
          <Note filled label={false} type='dark'>
            There is no products
          </Note>
        </div>
      ) : (
        <>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {products.map((product) => (
              <ProductItem key={product._id} product={product} />
            ))}
          </div>
        </>
      )}

      <div></div>
    </>
  )
}

export async function getServerSideProps() {
  //index.js in product file means product
  const res = await getData('product')
  return {
    props: {
      products: res.products,
      result: res.result,
    },
  }
}
