import { Button } from '@geist-ui/react'
import { useRouter } from 'next/dist/client/router'
import { useContext, useEffect, useState } from 'react'
import SearchEngineOptimization from '../../components/SearchEngineOptimization'
import { DataContext } from '../../store/GlobalState'

const DetailOrder = () => {
  const { state, dispatch } = useContext(DataContext)
  const { orders, auth } = state
  const router = useRouter()
  const [orderDetail, setOrderDetail] = useState([])
  useEffect(() => {
    const newArr = orders.filter((order) => order._id === router.query.id)
    setOrderDetail(newArr)
  }, [orders])
  if (!auth.user) return null
  return (
    <>
      <SearchEngineOptimization title='Order Page' />
      <div className='px-4 py-16 mx-auto sm:max-w-2xl md:max-w-full lg:max-w-screen-3xl md:px-24 lg:px-2 lg:py-20'>
        <div className='max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12'>
          <div>
            <p className='inline-block px-3 py-px mb-4 text-xs font-semibold tracking-wider text-teal-900 uppercase rounded-full bg-teal-accent-400'>
              Order Details
            </p>
          </div>
          <h2 className='max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto'>
            <span className='relative inline-block'>
              <svg
                viewBox='0 0 52 24'
                fill='currentColor'
                className='absolute top-0 left-0 z-0 hidden w-32 -mt-8 -ml-20 text-blue-gray-100 lg:w-32 lg:-ml-28 lg:-mt-10 sm:block'
              >
                <defs>
                  <pattern
                    id='d0d83814-78b6-480f-9a5f-7f637616b267'
                    x='0'
                    y='0'
                    width='.135'
                    height='.30'
                  >
                    <circle cx='1' cy='1' r='.7' />
                  </pattern>
                </defs>
                <rect
                  fill='url(#d0d83814-78b6-480f-9a5f-7f637616b267)'
                  width='52'
                  height='24'
                />
              </svg>
              <span className='relative'>Shipping</span>
            </span>{' '}
            Address
          </h2>
          <div className='mx-auto'>
            <Button onClick={() => router.back()} type='secondary'>
              Go back
            </Button>
          </div>
        </div>

        <div className='relative grid gap-8 row-gap-5 mb-8 md:row-gap-8 lg:grid-cols-6 sm:grid-cols-2'>
          <div className='absolute inset-0 flex items-center justify-center sm:hidden lg:flex'>
            <div className='w-px h-full bg-gray-300 lg:w-full lg:h-px' />
          </div>
          {orderDetail.map((order) => (
            <>
              <div className='p-5 duration-300 transform bg-white border rounded shadow-sm hover:-translate-y-2'>
                <div className='flex items-center justify-between mb-2'>
                  <p className='text-lg font-bold leading-5'>Order ID</p>
                  <p className='flex items-center justify-center w-6 h-6 font-bold rounded text-deep-purple-accent-400 bg-indigo-50'>
                    1
                  </p>
                </div>
                <p className='text-sm text-gray-900'>{order._id}</p>
              </div>
              <div className='p-5 duration-300 transform bg-white border rounded shadow-sm hover:-translate-y-2'>
                <div className='flex items-center justify-between mb-2'>
                  <p className='text-lg font-bold leading-5'>Name</p>
                  <p className='flex items-center justify-center w-6 h-6 font-bold rounded text-deep-purple-accent-400 bg-indigo-50'>
                    2
                  </p>
                </div>
                <p className='text-sm text-gray-900'>{order.user.name}</p>
              </div>
              <div className='p-5 duration-300 transform bg-white border rounded shadow-sm hover:-translate-y-2'>
                <div className='flex items-center justify-between mb-2'>
                  <p className='text-lg font-bold leading-5'>Order Email</p>
                  <p className='flex items-center justify-center w-6 h-6 font-bold rounded text-deep-purple-accent-400 bg-indigo-50'>
                    3
                  </p>
                </div>
                <p className='text-sm text-gray-900'>{order.user.email}</p>
              </div>
              <div className='p-5 duration-300 transform bg-white border rounded shadow-sm hover:-translate-y-2'>
                <div className='flex items-center justify-between mb-2'>
                  <p className='text-lg font-bold leading-5'>Order Address</p>
                  <p className='flex items-center justify-center w-6 h-6 font-bold rounded text-deep-purple-accent-400 bg-indigo-50'>
                    4
                  </p>
                </div>
                <p className='text-sm text-gray-900'>
                  {order.address ? order.address : 'Address is not added'}
                </p>
              </div>
              <div className='p-5 duration-300 transform bg-white border rounded shadow-sm hover:-translate-y-2'>
                <div className='flex items-center justify-between mb-2'>
                  <p className='text-lg font-bold leading-5'>Order Mobile</p>
                  <p className='flex items-center justify-center w-6 h-6 font-bold rounded text-deep-purple-accent-400 bg-indigo-50'>
                    5
                  </p>
                </div>
                <p className='text-sm text-gray-900'>
                  {order.mobile ? order.mobile : 'Mobile is not added'}
                </p>
              </div>
              <div
                className={` p-5 duration-300 transform  border rounded shadow-sm hover:-translate-y-2 text-white ${
                  order.delivered ? 'bg-green-400' : 'bg-red-600'
                }`}
              >
                <div className='flex items-center justify-between mb-2'>
                  <p className='text-lg font-bold leading-5'>Deliver Status</p>
                </div>
                <p className='text-sm text-white'>
                  {order.delivered
                    ? 'Order is delivered'
                    : 'Order is not delivered'}
                </p>
              </div>
            </>
          ))}
        </div>
      </div>
    </>
  )
}

export default DetailOrder
