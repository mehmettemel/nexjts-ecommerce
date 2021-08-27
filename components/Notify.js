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
    }
    if (notify.success) {
      setToast({ type: 'success', text: notify.success })
    }
  }, [notify])

  return (
    <>
      <div className={`max-w-md mx-auto mt-10 absolute bottom-20 right-10 `}>
        {notify.error ? <div></div> : null}
        {notify.success ? <div></div> : null}
      </div>
    </>
  )
}

export default Notify
