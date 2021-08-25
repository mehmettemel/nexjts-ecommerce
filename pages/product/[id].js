import React, { useContext, useRef, useState } from 'react'
import SearchEngineOptimization from '../../components/SearchEngineOptimization'
import { getData } from '../../utils/fetchData'
import { DataContext } from '../../store/GlobalState'
import { addToCart } from '../../store/Actions'

const DetailProduct = ({ product }) => {
  const [detailProduct, setDetailProduct] = useState(product)
  const [tab, setTab] = useState(0)
  const { state, dispatch } = useContext(DataContext)
  const { cart } = state
  const isActive = (index) => {
    if (tab === index) return 'border-4 border-teal-accent-400'
    return ''
  }

  const handleAddCart = () => {
    dispatch({
      type: 'NOTIFY',
      payload: { success: 'Product is added to cart' },
    })
    dispatch(addToCart(detailProduct, cart))
  }
  return (
    <div>
      <SearchEngineOptimization title='Product Detail' />
      <div className='py-6'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6'>
          <div className='flex flex-col md:flex-row -mx-4'>
            <div className='md:flex-1 px-4'>
              <div>
                <div className='h-64 md:h-96 rounded-lg bg-gray-100 mb-4'>
                  <img
                    src={detailProduct.images[tab].url}
                    alt={detailProduct.images[tab].url}
                    className='object-cover w-full h-full rounded'
                  />
                </div>
                <div className='grid grid-cols-3  gap-2'>
                  {detailProduct.images.map((img, index) => (
                    <div
                      key={index}
                      className='h-24 md:h-32 rounded-lg bg-gray-100 mb-4 flex items-center justify-center'
                    >
                      <img
                        className={`${isActive(
                          index
                        )} object-cover w-full h-full rounded cursor-pointer`}
                        src={img.url}
                        alt={img.url}
                        onClick={() => setTab(index)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className='md:flex-1 px-4'>
              <h2 className='mb-2 leading-tight tracking-tight font-bold text-gray-800 text-2xl md:text-3xl'>
                {detailProduct.title}
              </h2>
              <p className='text-gray-500 text-sm'>
                By{' '}
                <a href='#' className='text-indigo-600 hover:underline'>
                  ABC Company
                </a>
              </p>

              <div className='flex items-center space-x-4 my-4'>
                <div>
                  <div className='rounded-lg bg-gray-100 flex py-2 px-3'>
                    <span className='text-indigo-400 mr-1 mt-1'>$</span>
                    <span className='font-bold text-indigo-600 text-3xl'>
                      {detailProduct.price}
                    </span>
                  </div>
                </div>
                <div className='flex-1'>
                  <p className='text-green-500 text-xl font-semibold'>
                    {detailProduct.inStock > 0 ? (
                      <span>In Stock : {detailProduct.inStock}</span>
                    ) : (
                      <span className='text-red-400'>Out Stock</span>
                    )}
                  </p>
                  <p className='text-gray-400 text-sm'>
                    Inclusive of all Taxes.
                  </p>
                  <p className='text-gray-400 text-sm'>
                    Sold:{detailProduct.sold}
                  </p>
                </div>
              </div>

              <p className='text-gray-500'>{detailProduct.content}</p>

              <div className='flex py-4 space-x-4'>
                <div className='relative'>
                  <div className='text-center left-0 pt-2 right-0 absolute block text-xs uppercase text-gray-400 tracking-wide font-semibold'>
                    Qty
                  </div>
                  <select className='cursor-pointer appearance-none rounded-xl border border-gray-200 pl-4 pr-8 h-14 flex items-end pb-1'>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </select>

                  <svg
                    className='w-5 h-5 text-gray-400 absolute right-0 bottom-0 mb-2 mr-2'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M8 9l4-4 4 4m0 6l-4 4-4-4'
                    />
                  </svg>
                </div>

                <button
                  type='button'
                  className='h-14 px-6 py-2 font-semibold rounded-xl bg-teal-accent-400 hover:bg-teal-accent-700 text-white'
                  onClick={handleAddCart}
                  disabled={detailProduct.inStock === 0 ? true : false}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DetailProduct
export async function getServerSideProps({ params: { id } }) {
  const res = await getData(`product/${id}`)
  return {
    props: {
      product: res.product,
    },
  }
}
