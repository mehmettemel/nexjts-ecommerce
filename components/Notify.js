import { Note, Loading, useToasts } from '@geist-ui/react'
import React, { useContext, useEffect } from 'react'
import { DataContext } from '../store/GlobalState'
const Notify = () => {
  const { state, dispatch } = useContext(DataContext)
  const { notify } = state

  useEffect(() => {
    if (notify.error) {
      var x = document.getElementById('snackbar')
      x.className = 'vercel-snackbar-show fadeIn'
      setTimeout(function () {
        x.className = x.className.replace(
          'vercel-snackbar-show fadeIn',
          'vercel-snackbar'
        )
      }, 3000)
    }
  }, [notify])

  return (
    <>
      <div className={`max-w-md mx-auto mt-10 absolute bottom-20 right-10 `}>
        {notify.loading && <Loading />}
        {notify.error && (
          <div id='snackbar' className='vercel-snackbar' label='warning'>
            {notify.error}
          </div>
        )}
      </div>
    </>
  )
}

export default Notify
