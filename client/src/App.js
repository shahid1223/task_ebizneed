import { Fragment, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Signup from './pages/Signup';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';

const App = () => {
  const data = useSelector(state => state);
  useEffect(() => {
    if (data.tokenFromLogin !== null) {
      console.log("Loged in")
    }
    if (data.tokenFromSiginUp !== null) {
      console.log("Registered successfully")
    }
  }, [data])
  return (
    <Fragment>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>strokeLinecap
    </Fragment>
  );
}

export default App;
