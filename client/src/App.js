import './App.scss';
import { Route, Routes } from 'react-router-dom';

import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import CreateOperation from './components/CreateOperation/CreateOperation';


function App() {
  return (
    <div className="App">

      <Navbar />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/createoperation' element={<CreateOperation />} />
      </Routes>

      <Footer />

    </div>
  );
}

export default App;
