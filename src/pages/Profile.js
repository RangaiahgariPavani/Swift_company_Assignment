import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css'; // ✅ link to custom styles

function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then(data => setUser(data[0]));
  }, []);

  if (!user) return <p>Loading...</p>;

  const { name, email, phone, address, id } = user;

  return (
    <div>
        <h1>Welcome, {name}</h1>
    <div className="profile-container"> 
      <div className="profile-card">
        <div className='profile-top'>
          <img
            className="profile-image"
            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(name)}`}
            alt="Profile"
          />
          <div className='user'>
             <h2>{name}</h2>
             <p>{email}</p>
          </div>
        </div>

        <div className="profile-bottom">
           <div className='user-details'>
               <p>User ID</p>
               <button className='custom-btn'>{id}</button>
           </div>
            <div className='user-details'>
               <p>Name</p>
               <button className='custom-btn'>{name}</button>
           </div>
            <div className='user-details'>
               <p>Email ID</p>
               <button className='custom-btn'>{email}</button>
           </div>
            <div className='user-details'>
               <p>Address</p>
               <button className='custom-btn'>{address.street}, {address.suite},{address.city}, {address.zipcode}</button>
           </div>
           <div className='user-details'>
               <p>Phone</p>
               <button className='custom-btn'>{phone}</button>
           </div>

        </div>
      </div>
    </div>
    </div>
  );
}

export default Profile;
