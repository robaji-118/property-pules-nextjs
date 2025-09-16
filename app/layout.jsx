import "@/assets/styles/global.css";
import Navbar  from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: `Property Pulse`,
  icons: {
    icon: "favicon.ico",
  },
  keywords: `rental, property, real estate`,
  description: `Find the perfect`,
};

const MainLayout = ({ children }) => {
  return (
    <html>
      <body>
        <main>
          <Navbar></Navbar>
          {children}
          <Footer></Footer>
        </main>
      </body>
    </html>
  );
};

export default MainLayout;
  