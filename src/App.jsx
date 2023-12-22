import { Outlet } from 'react-router-dom';
import './App.css';
import MyCarousel from './components/main/MyCarousel';
import Footer from './components/main/Footer';
import Navbar from './components/main/Navbar';

function App() {
  return (
    <>
      <Navbar />
      {/* <MyCarousel /> */}
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
