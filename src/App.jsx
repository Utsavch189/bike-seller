import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import RootContext from './context/RootContext';

function App() {
  const [isLogin, setIsLogin] = useState(false);

  const contextData = {
    isLogin, setIsLogin
  }

  const authSetup = () => {
    const token = localStorage.getItem("token");

    if (token !== null) {
      setIsLogin(true);
    }
  }

  useEffect(() => {
    authSetup();
  }, []);

  return (
    <RootContext.Provider value={contextData}>
      <Outlet />
    </RootContext.Provider>
  );
}

export default App;
