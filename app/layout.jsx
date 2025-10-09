import '@/assets/styles/global.css'
import Navbar from '@/components/Navbar'
import AuthProvider from '@/components/AuthProvider'
import { ToastContainer } from 'react-toastify'
import { GlobalProvider } from '@/context/GlobalContext'
import 'react-toastify/dist/ReactToastify.css'
import Footer from '@/components/Footer'


export const metadata = {
  title: `Property Pulse`,
  icons: {
    icon: 'favicon.ico'
  },
  keywords: `rental, property, real estate`,
  description: `Find the perfect`
}

const MainLayout = ({ children }) => {
  return (
    <AuthProvider>
      <GlobalProvider>
      <html>
        <body>
          <main>
            <Navbar></Navbar>
            {children}
            <Footer></Footer>
            <ToastContainer></ToastContainer>
          </main>
        </body>
      </html>
      </GlobalProvider>
    </AuthProvider>
  )
}

export default MainLayout
