import { Card, Select } from '@geist-ui/react'
import { useRouter } from 'next/dist/client/router'
import React, { useEffect, useState } from 'react'
import { filterSearch } from '../utils/filterSearch'
const Filter = ({ state }) => {
  const router = useRouter()
  const { categories } = state

  const [search, setSearch] = useState('')

  useEffect(() => {
    filterSearch({ router, search: search ? search.toLowerCase() : 'all' })
  }, [search])

  const filterHandler = (val) => {
    filterSearch({ router, category: val })
  }
  const sortHandler = (val) => {
    filterSearch({ router, sort: val })
  }

  return (
    <>
      <div className='my-4'>
        <Card>
          <div className='flex justify-between items-center flex-col space-y-5 md:flex-row md:space-y-0 md:space-x-4'>
            <Select placeholder='Filter results' onChange={filterHandler}>
              <Select.Option value='all'>All Products</Select.Option>
              {categories.map((item) => (
                <Select.Option key={item._id} value={item._id}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
            <form autoComplete='off' className='space-y-1 text-coolGray-800'>
              <div className='relative'>
                <span className='absolute inset-y-0 left-0 flex items-center pl-2'>
                  <button type='button' title='search' className='p-1 focus:outline-none focus:ring'>
                    <svg fill='currentColor' viewBox='0 0 512 512' className='w-4 h-4 text-coolGray-800'>
                      <path d='M479.6,399.716l-81.084-81.084-62.368-25.767A175.014,175.014,0,0,0,368,192c0-97.047-78.953-176-176-176S16,94.953,16,192,94.953,368,192,368a175.034,175.034,0,0,0,101.619-32.377l25.7,62.2L400.4,478.911a56,56,0,1,0,79.2-79.195ZM48,192c0-79.4,64.6-144,144-144s144,64.6,144,144S271.4,336,192,336,48,271.4,48,192ZM456.971,456.284a24.028,24.028,0,0,1-33.942,0l-76.572-76.572-23.894-57.835L380.4,345.771l76.573,76.572A24.028,24.028,0,0,1,456.971,456.284Z'></path>
                    </svg>
                  </button>
                </span>
                <input
                  value={search.toLowerCase()}
                  onChange={(e) => setSearch(e.target.value)}
                  list='title_product'
                  type='search'
                  name='Search'
                  placeholder='Search...'
                  className='w-32 py-2 pl-10 text-sm rounded-md sm:w-auto outline-none focus:outline-none text-coolGray-800  transition-all border  border-opacity-30 border-gray-700 hover:border-opacity-60 hover:border-black focus:border-opacity-60 focus:border-black   '
                />
              </div>
            </form>
            <Select placeholder='Sort results' onChange={sortHandler}>
              <Select.Option value='-createdAt'>Newest</Select.Option>
              <Select.Option value='oldest'>Oldest</Select.Option>
              <Select.Option value='-sold'>Best sales</Select.Option>
              <Select.Option value='-price'>Price: High - Low</Select.Option>
              <Select.Option value='price'>Price: Low - High</Select.Option>
            </Select>
          </div>
        </Card>
      </div>
    </>
  )
}

export default Filter
