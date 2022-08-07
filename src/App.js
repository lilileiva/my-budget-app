import './App.scss';
import { Route, Routes } from 'react-router-dom';

import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import CreateTransaction from './components/CreateTransaction/CreateTransaction';
import EditTransaction from './components/EditTransaction/EditTransaction';


function App() {
  return (
    <div className="App">

      <Navbar />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/transaction/create' element={<CreateTransaction />} />
        <Route path='/transaction/edit/:id' element={<EditTransaction />} />
      </Routes>

      <Footer />

    </div>
  );
}

export default App;
