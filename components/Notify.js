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
    if (notify.success) {
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
        {/* {notify.loading && <Loading />} */}
        {notify.error && (
          <div id='snackbar' className='vercel-snackbar'>
            {notify.error}
          </div>
        )}
        {notify.success && (
          <div id='snackbar' className='vercel-snackbar'>
            {notify.success}
          </div>
        )}
      </div>
    </>
  )
}

export default Notify
