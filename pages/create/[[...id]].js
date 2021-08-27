import { useContext, useEffect, useState } from 'react'
import { DataContext } from '../../store/GlobalState'
import SearchEngineOptimization from '../../components/SearchEngineOptimization'
import { Avatar, Button, Select } from '@geist-ui/react'
import { imageUpload } from '../../utils/imageUpload'
import { getData, postData, putData } from '../../utils/fetchData'
import { useRouter } from 'next/dist/client/router'
const ProductManagement = () => {
  const { state, dispatch } = useContext(DataContext)
  const router = useRouter()
  const { id } = router.query
  const { categories, auth, notify } = state
  const initialState = {
    product_id: '',
    title: '',
    price: 0,
    inStock: 0,
    description: '',
    content: '',
    category: '',
  }
  const [product, setProduct] = useState(initialState)
  const { product_id, title, price, inStock, description, content, category } =
    product
  const [images, setImages] = useState([])
  const [onEdit, setOnEdit] = useState(false)
  useEffect(() => {
    if (id) {
      setOnEdit(true)
      getData(`product/${id}`).then((res) => {
        setProduct(res.product)
        setImages(res.product.images)
      })
    } else {
      setOnEdit(false)
      setProduct(initialState)
      setImages([])
    }
  }, [id])
  const handleChangeInput = (e) => {
    const { name, value } = e.target
    setProduct({ ...product, [name]: value })
    dispatch({ type: 'NOTIFY', payload: {} })
  }
  const handleSelectOption = (val) => {
    setProduct({ ...product, category: val })
  }

  const handleUploadInput = (e) => {
    dispatch({ type: 'NOTIFY', payload: {} })
    let newImages = []
    let num = 0
    let err = ''
    const files = [...e.target.files]
    if (files.length === 0)
      return dispatch({
        type: 'NOTIFY',
        payload: { error: 'Files does not exist' },
      })
    files.forEach((file) => {
      if (file.size > 1024 * 1024)
        return (err = 'The largest image size is 1MB')
      if (file.type !== 'image/jpeg' && file.type !== 'image/png')
        return (err = 'Image format is incorrect')

      num += 1
      if (num <= 5) newImages.push(file)
      return newImages
    })

    if (err)
      return dispatch({
        type: 'NOTIFY',
        payload: { error: err },
      })

    const imgCount = images.length
    if (imgCount + newImages.length > 5)
      return dispatch({
        type: 'NOTIFY',
        payload: { error: 'Select up to 5 images' },
      })
    setImages([...images, ...newImages])
  }

  const deleteImage = (index) => {
    const newArr = [...images]
    newArr.splice(index, 1)
    setImages(newArr)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (auth.user.role !== 'admin')
      return dispatch({
        type: 'NOTIFY',
        payload: { error: 'Auth is not valid' },
      })

    if (
      !title ||
      !price ||
      !inStock ||
      !description ||
      !content ||
      category === 'all' ||
      images.length === 0
    )
      return dispatch({
        type: 'NOTIFY',
        payload: { error: 'Please add all the fields.' },
      })

    dispatch({
      type: 'NOTIFY',
      payload: { loading: true },
    })
    let media = []
    const imgNewUrl = images.filter((img) => !img.url)
    const imgOldUrl = images.filter((img) => img.url)
    if (imgNewUrl.length > 0) media = await imageUpload(imgNewUrl)

    let res
    if (onEdit) {
      res = await putData(
        `product/${id}`,
        {
          ...product,
          images: [...imgOldUrl, ...media],
        },
        auth.token
      )
      if (res.err)
        return dispatch({
          type: 'NOTIFY',
          payload: { error: res.err },
        })
    } else {
      res = await postData(
        'product',
        {
          ...product,
          images: [...imgOldUrl, ...media],
        },
        auth.token
      )
      if (res.err)
        return dispatch({
          type: 'NOTIFY',
          payload: { error: res.err },
        })
    }

    dispatch({
      type: 'NOTIFY',
      payload: { loading: false },
    })
    router.push('/')
    return dispatch({
      type: 'NOTIFY',
      payload: { success: res.msg },
    })
  }

  return (
    <>
      <SearchEngineOptimization title='Product Edit ' />
      <form
        onSubmit={handleSubmit}
        className='container flex flex-col mx-auto space-y-12 ng-untouched ng-pristine ng-valid'
      >
        <fieldset className='grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm bg-coolGray-50'>
          <div className='space-y-2 col-span-full lg:col-span-1'>
            <p className='font-medium'>Add Your Products</p>
            <p className='text-xs'>You can add your products in this page</p>
          </div>
          <div className='grid grid-cols-6 gap-4 col-span-full lg:col-span-3'>
            <div className='col-span-full sm:col-span-3'>
              <label htmlFor='title' className='text-sm'>
                Product Title
              </label>
              <input
                onChange={handleChangeInput}
                value={title}
                id='title'
                name='title'
                type='text'
                placeholder='Product name'
                className='vercel-button'
              />
            </div>
            <div className='col-span-full sm:col-span-3'>
              <label htmlFor='price' className='text-sm'>
                Price
              </label>
              <input
                onChange={handleChangeInput}
                value={price}
                id='price'
                name='price'
                type='number'
                placeholder='Price'
                className='vercel-button'
              />
            </div>
            <div className='col-span-full sm:col-span-3'>
              <label htmlFor='inStock' className='text-sm'>
                inStock
              </label>
              <input
                onChange={handleChangeInput}
                value={inStock}
                id='inStock'
                name='inStock'
                type='text'
                placeholder='inStock'
                className='vercel-button'
              />
            </div>
            <div className='col-span-full sm:col-span-3'>
              <div className='col-span-full'>
                <label htmlFor='bio' className='text-sm'>
                  Photo -{' '}
                  <span className='text-xs text-gray-500'>
                    Click to avatar to remove image
                  </span>
                </label>
                <div className='flex items-center space-x-2'>
                  <Button type='secondary'>
                    <label className='cursor-pointer'>
                      <input
                        hidden
                        multiple
                        accept='image/*'
                        type='file'
                        name='avatar'
                        id='avatar'
                        onChange={handleUploadInput}
                      />
                      Add Product Images
                    </label>
                  </Button>
                  {images.map((img, index) => (
                    <div key={index} className='cursor-pointer'>
                      <Avatar
                        onClick={() => deleteImage(index)}
                        width='40px'
                        height='40px'
                        src={img.url ? img.url : URL.createObjectURL(img)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className='col-span-full sm:col-span-3'>
              <textarea
                onChange={handleChangeInput}
                value={description}
                id='description'
                name='description'
                placeholder='Write your description'
                className='vercel-button'
              />
            </div>
            <div className='col-span-full sm:col-span-3'>
              <textarea
                onChange={handleChangeInput}
                value={content}
                id='content'
                name='content'
                placeholder='Write your content'
                className='vercel-button'
              />
            </div>
            <div className='col-span-full flex items-center'>
              <Select
                placeholder='Choose category'
                name='category'
                id='category'
                onChange={handleSelectOption}
                value={category}
              >
                <Select.Option value='all'>All Products</Select.Option>
                {categories.map((item) => (
                  <Select.Option key={item._id} value={item._id}>
                    {item.name}
                  </Select.Option>
                ))}
              </Select>
            </div>
            <div className='col-span-full mt-2'>
              <Button
                loading={notify.loading}
                htmlType='submit'
                type='secondary'
              >
                {onEdit ? 'Update Product' : 'Create Product'}
              </Button>
            </div>
          </div>
        </fieldset>
      </form>
    </>
  )
}
export default ProductManagement
