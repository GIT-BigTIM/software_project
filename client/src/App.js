import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import { AuthContext } from './helper/AuthContext';
import { useState, useEffect } from 'react';
import axios from 'axios';
import SuccessPage from './pages/SuccessPage';

function App() {

  const [authState, setAuthState] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:3001/auth/user', {header: { accessToken: localStorage.getItem('accessToken') }, })
    .then((response) => {
      if(response.data.error) {
        setAuthState(false);
      }else{
        setAuthState(true);
      }
    });
  }, []);

  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>
          <div className="navbar"> 
          {!authState && (
          <>
            <Link to='/login'> Login </Link>
            <Link to='/createuser'> Create User </Link>
          </>
          )};
          <Link to='/'> Home page </Link>
          </div>    
          <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/createuser' element={<Register/>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/success' element={<SuccessPage/>} />
          </Routes>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
