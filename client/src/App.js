import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import SuccessPage from './pages/SuccessPage';
import Profile from './pages/Profile';
import Art from './pages/Art';
import PostArt from './pages/PostArt';
import Cart from './pages/Cart';
import Payment from './pages/Payment';
import PaymentDetail from './pages/PaymentDetail';
import EditProfile from './pages/EditProfile';

import { AuthContext } from './helper/AuthContext';
import { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import ArtDetail from './pages/ArtDetail';


function App() {

  const [authState, setAuthState] = useState({ username: "", id: 0, status: false });

  useEffect(() => {
    axios.get('http://localhost:3001/auth/user', { headers: { accessToken: localStorage.getItem("accessToken") } }).then((response) => {
      if (response.data.error) {
        setAuthState({ ...authState, status: false });
      } else {
        setAuthState({ username: response.data.username, id: response.data.id, status: true });
      }
    });
  }, []);

  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({ username: "", id: 0, status: false });
  };

  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>

        {!authState.status ? (
          <>
            <Link to='/login'> Login </Link>
            <Link to='/createuser'> Create User </Link>
          </>
          ) : (
          <>
            <button onClick={logout}> Logout </button>
            <Link to={`/profile/${authState.id}`}> {authState.username} </Link>
            <Link to='/cart'> Cart </Link> 
            <Link to={`/payment/${authState.id}`}> Payment </Link>
          </>
          )}
          <Link to='/'> Home page </Link>
          <Link to='/postArt'> Post Art </Link>

          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/createuser' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='/success' element={<SuccessPage />} />
            <Route path='/profile/:id' element={<Profile />} />
            <Route path='/art/:id' element={<Art />} />
            <Route path='/artDetail/:id' element={<ArtDetail />} />
            <Route path='/postArt' element={<PostArt />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/payment/:id' element={<Payment />} />
            <Route path='/detail/:id' element={<PaymentDetail />} />
            <Route path='/editProfile/:id' element={<EditProfile />} />
          </Routes>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
