import React, { useContext, useState } from 'react'
import { DataContext } from '../store/GlobalState'
import { List, X } from '@geist-ui/react-icons'
import { deleteData, postData, putData } from '../utils/fetchData'
import { Button } from '@geist-ui/react'
import { Edit3 } from '@geist-ui/react-icons'
import { deleteItem, updateItem } from '../store/Actions'
import SearchEngineOptimization from '../components/SearchEngineOptimization'

const Categories = () => {
  const { state, dispatch } = useContext(DataContext)
  const { auth, categories, notify } = state
  const [name, setName] = useState('')
  const [id, setId] = useState('')
  const createCategory = async () => {
    if (auth.user.role !== 'admin')
      return dispatch({
        type: 'NOTIFY',
        payload: { error: 'Auth is not valid' },
      })
    if (!name)
      return dispatch({
        type: 'NOTIFY',
        payload: { error: 'Name cannot be blank' },
      })

    let res
    if (id) {
      res = await putData(`/categories/${id}`, { name }, auth.token)
      if (res.err)
        dispatch({
          type: 'NOTIFY',
          payload: { error: res.err },
        })
      dispatch(updateItem(categories, id, res.category, 'ADD_CATEGORIES'))
    } else {
      res = await postData('categories', { name }, auth.token)
      if (res.err)
        dispatch({
          type: 'NOTIFY',
          payload: { error: res.err },
        })
      dispatch({
        type: 'ADD_CATEGORIES',
        payload: [...categories, res.newCategory],
      })
    }
    setName('')
    setId('')
    return dispatch({
      type: 'NOTIFY',
      payload: { success: 'Category is created' },
    })
  }
  const handleEditCategory = (category) => {
    setId(category._id)
    setName(category.name)
  }

  return (
    <>
      <SearchEngineOptimization title='Categories' />
      <div
        className='w-full bg-gray-500 mt-12'
        style={{
          backgroundImage: "url('https://source.unsplash.com/random/640x480')",
          backgroundPosition: 'center center',
          backgroundBlendMode: 'multiply',
          backgroundSize: 'cover',
        }}
      >
        <div className='container mx-auto flex flex-col flex-wrap content-center justify-center p-4 py-20 md:p-10'>
          <h1 className='text-5xl antialiased font-semibold leading-none text-center text-teal-accent-400'>
            Category
          </h1>
          <p className='pt-2 pb-8 text-xl antialiased text-center text-white'>You can create new category</p>
          <div className='flex flex-row'>
            <input
              type='text'
              placeholder='Laptops,Lights...'
              value={name}
              onChange={(e) => setName(e.target.value)}
              className=' w-3/5 p-3 rounded-l-lg sm:w-2/3'
            />
            <button
              onClick={createCategory}
              type='button'
              className='w-2/5 p-3 font-semibold rounded-r-lg sm:w-1/3 bg-teal-accent-100 text-coolGray-50'
            >
              {id ? 'Update' : 'Create'}
            </button>
          </div>
          <div className='px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20'>
            <div className='grid grid-cols-1 items-center justify-center gap-5 row-gap-5  lg:grid-cols-3'>
              {categories.map((category) => (
                <div key={category._id} className='text-center'>
                  <div className='flex items-center justify-center w-10 h-10 mx-auto mb-4 rounded-full bg-teal-accent-700 sm:w-12 sm:h-12'>
                    <List />
                  </div>
                  <h6 className='mb-2 text-sm text-white font-bold leading-5 tracking-wider '>
                    {category.name}
                  </h6>
                  <div className='space-x-3'>
                    <Button
                      onClick={() => handleEditCategory(category)}
                      type='warning'
                      iconRight={<Edit3 />}
                      auto
                      scale={2 / 3}
                    />
                    <Button
                      type='error'
                      iconRight={<X />}
                      auto
                      scale={2 / 3}
                      onClick={() =>
                        deleteData(`categories/${category._id}`, auth.token).then((res) => {
                          if (res.err)
                            return dispatch({
                              type: 'NOTIFY',
                              payload: { error: res.err },
                            })

                          dispatch(deleteItem(categories, category._id, 'ADD_CATEGORIES'))

                          return dispatch({
                            type: 'NOTIFY',
                            payload: { success: res.msg },
                          })
                        })
                      }
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Categories
