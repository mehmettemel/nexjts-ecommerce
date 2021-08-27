import { Button, Note } from '@geist-ui/react'
import { AlignCenter } from '@geist-ui/react-icons'
import { useRouter } from 'next/dist/client/router'
import { useContext, useEffect, useState } from 'react'
import Filter from '../components/Filter'
import ProductItem from '../components/product/ProductItem'
import SearchEngineOptimization from '../components/SearchEngineOptimization'
import { DataContext } from '../store/GlobalState'
import { getData } from '../utils/fetchData'
import { filterSearch } from '../utils/filterSearch'
export default function Home(props) {
  const { state, dispatch } = useContext(DataContext)
  const [products, setProducts] = useState(props.products)
  const [page, setPage] = useState(1)
  const router = useRouter()
  useEffect(() => {
    setProducts(props.products)
  }, [props.products])
  useEffect(() => {
    if (Object.keys(router.query).length === 0) {
      setPage(1)
    }
  }, [router.query])

  const handleLoadMore = () => {
    setPage(page + 1)
    filterSearch({ router, page: page + 1 })
  }
  return (
    <>
      <SearchEngineOptimization title='Temel E-commerce' />
      <Filter state={state} />
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

      <div className='my-5 max-w-md mx-auto flex justify-center'>
        {props.result < page * 3 ? null : (
          <Button onClick={handleLoadMore} type='secondary' icon={<AlignCenter />}>
            Load More
          </Button>
        )}
      </div>
      <button onClick={() => router.push({})}>query denem</button>
    </>
  )
}

export async function getServerSideProps({ query }) {
  const page = query.page || 1
  const category = query.category || 'all'
  const sort = query.sort
  const search = query.search || 'all'

  //index.js in product file means product
  const res = await getData(`product?limit=${page * 3}&category=${category}&sort=${sort}&title=${search}`)
  return {
    props: {
      products: res.products,
      result: res.result,
    },
  }
}
