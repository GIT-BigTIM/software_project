import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

function EditProfile() {

  let { id } = useParams();
  const [userInfo, setUserInfo] = useState({
    username: '',
    email: '',
    tel: '',
    address: '',
  });
  
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:3001/auth/byId/${id}`, {
      headers: {
        accessToken: localStorage.getItem('accessToken')
      }
    }).then((response) => {
      setUserInfo(response.data);
    });
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserInfo(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.put('http://localhost:3001/auth/user', userInfo, {
      headers: {
        accessToken: localStorage.getItem('accessToken')
      }
    }).then((response) => {
      if (response.data.success) {
        console.log(response.data.success);
        alert('Update profile success!!');
      } else {
        alert('Error updating profile.');
      }
    });
  };

  const handlePasswordChange = (event) => {
    event.preventDefault();
    if (userInfo.newPassword !== userInfo.confirmPassword) {
        alert("New password and confirmation do not match.");
        return;
    }
    axios.put('http://localhost:3001/auth/password', 
    {
        newPassword: userInfo.newPassword,
    }, 
    {
        headers: {
            accessToken: localStorage.getItem('accessToken')
        }
    }).then((response) => {
        if (response.data.success) {
            alert('Password updated successfully!');
            setUserInfo({ ...userInfo, password: '', newPassword: '', confirmPassword: '' });
        } else {
            alert('Error updating password.');
        }
    });
};

  return (
    <div className="editProfileContainer">
      <h1>Edit Profile</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={userInfo.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={userInfo.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Telephone Number:</label>
          <input
            type="tel"
            name="tel"
            value={userInfo.tel}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Address:</label>
          <input
            type="text"
            name="address"
            value={userInfo.address}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" > Chage Info </button>
      </form>


      <h2>Change Password</h2>
        <form onSubmit={handlePasswordChange}>
            <div>
                <label>New Password:</label>
                <input
                    type="password"
                    name="newPassword"
                    value={userInfo.newPassword}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Confirm New Password:</label>
                <input
                    type="password"
                    name="confirmPassword"
                    value={userInfo.confirmPassword}
                    onChange={handleChange}
                    required
                />
            </div>
            <button type="submit">Change Password</button>
        </form>
        <button onClick={() => {navigate(`/profile/${id}`);}}> Update Profile </button>
    </div>
  );
}

export default EditProfile;
