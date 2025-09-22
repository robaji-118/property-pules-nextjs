import '@/assets/styles/global.css'
import Navbar from '@/components/Navbar'
import AuthProvider from '@/components/AuthProvider'
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
      <html>
        <body>
          <main>
            <Navbar></Navbar>
            {children}
            <Footer></Footer>
          </main>
        </body>
      </html>
    </AuthProvider>
  )
}

export default MainLayout
