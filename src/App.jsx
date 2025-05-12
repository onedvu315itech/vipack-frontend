import { RouterProvider } from 'react-router-dom'
import router from './routes'
import { ToastContainer } from 'react-toastify'

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer position="top-right" autoClose={5000} />
    </>
  )
}

export default App
