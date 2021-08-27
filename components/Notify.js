import { useToasts } from '@geist-ui/react'
import React, { useContext, useEffect } from 'react'
import { DataContext } from '../store/GlobalState'
const Notify = () => {
  const { state, dispatch } = useContext(DataContext)
  const { notify } = state
  const [toasts, setToast] = useToasts()
  useEffect(() => {
    if (notify.error) {
      setToast({ type: 'error', text: notify.error })
      // var x = document.getElementById('snackbar')
      // x.className = 'vercel-snackbar-show fadeIn'
      // setTimeout(function () {
      //   x.className = x.className.replace(
      //     'vercel-snackbar-show fadeIn',
      //     'vercel-snackbar'
      //   )
      // }, 3000)
    }
    if (notify.success) {
      setToast({ type: 'success', text: notify.success })
      // var x = document.getElementById('snackbar')
      // x.className = 'vercel-snackbar-show fadeIn'
      // setTimeout(function () {
      //   x.className = x.className.replace(
      //     'vercel-snackbar-show fadeIn',
      //     'vercel-snackbar'
      //   )
      // }, 3000)
    }
  }, [notify])

  return (
    <>
      <div className={`max-w-md mx-auto mt-10 absolute bottom-20 right-10 `}>
        {/* {notify.loading && <Loading />} */}
        {notify.error ? <div></div> : null}
        {notify.success ? <div></div> : null}
      </div>
    </>
  )
}

export default Notify
