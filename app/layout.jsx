import "@/assets/styles/global.css";

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
          Main Layout
          {children}
        </main>
      </body>
    </html>
  );
};

export default MainLayout;
  