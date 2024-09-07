import React from 'react';
import { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../helper/AuthContext'

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const {setAuthState} = useContext(AuthContext);

  let navigate = useNavigate();

  const login = () => {
    const data = {username: username, password: password};
    axios.post("http://localhost:3001/auth/login", data).then((response) => {
      if(response.data.error) {
        alert(response.data.error);
      }else {
        localStorage.setItem('accessToken', response.data);
        setAuthState(true);
        navigate("/");
      }
    });
  }

  return (
    <div>
      <h1> This is Login page </h1>
      <input type="text" onChange={(event) => {setUsername(event.target.value);}}></input>
      <input type="password" onChange={(event) => {setPassword(event.target.value);}}></input>

      <button onClick={login}> Login </button>
    </div>
  )
}

export default Login
