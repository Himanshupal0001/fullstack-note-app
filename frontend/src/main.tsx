import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { store } from './store.ts'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import router from './routes/router.tsx'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/ReactToastify.css'
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
      <ToastContainer />
    </Provider>
  </React.StrictMode>,
)
