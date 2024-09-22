import React from 'react';
import { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../helper/AuthContext'
import "../css/Login.css"

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
      } else {
        localStorage.setItem('accessToken', response.data.token);
        setAuthState({username: response.data.username, id: response.data.id, status: true});
        navigate("/");
      }
    });
  }

  return (
    <div className="login-container">
    <h1>เข้าสู่ระบบ</h1>
    <div className="login-form">
      <label htmlFor="username">ชื่อผู้ใช้:</label>
      <input
        type="text"
        id="username"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
      />

      <label htmlFor="password">รหัสผ่าน:</label>
      <input
        type="password"
        id="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />

      <button onClick={login} className="login-button">เข้าสู่ระบบ</button>
    </div>
  </div>
  )
}

export default Login
