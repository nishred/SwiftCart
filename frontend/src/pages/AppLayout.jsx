import { Outlet } from "react-router-dom";
import Container from "../components/Container";
import Footer from "../components/Footer";
import Header from "../components/Header";


const AppLayout = () => {
  return (
    <div className="h-screen grid grid-rows-[auto,1fr,auto]">
      <Header />
      <main className="py-3 overflow-auto">
        <Container>
          <Outlet />
        </Container>
      </main>
      <Footer />
    </div>
  );
};

export default AppLayout;
